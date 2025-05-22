import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CpfValidationService } from '../../services/cpf-validation.service';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask';
import { HttpClient } from '@angular/common/http';
import { CryptoService } from '../../services/crypto.service';
import CryptoJS from 'crypto-js';
import { NascimentoValidationService } from '../../services/nascimento-validation.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [provideNgxMask({
    dropSpecialCharacters: true,
    validation: true,
    })
  ],
})

export class CadastroComponent implements OnInit {
  private apiUrl =  'http://localhost:3000/cadastro';
  private publicKey?: string; //chave pública carregada do backend
  cadastroForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  cpfStatus: string | null = null;
  mostrarModal = false;

  constructor(
    private fb: FormBuilder,
    private CpfValidationService: CpfValidationService,
    private http: HttpClient,
    private cryptoService: CryptoService,
  ) {
    this.cadastroForm = this.fb.group({
    })
  }

 async ngOnInit(): Promise<void> {
    // Inicializa o formulário
    this.cadastroForm = this.fb.group(
      {
        nomeCompleto: ['', [Validators.required, Validators.minLength(8)]],
        cpf: ['', Validators.required],
        genero: ['', Validators.required],
        telefone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dataNascimento: ['', [Validators.required, NascimentoValidationService.validarDataNascimento]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue]
      },
      { validators: this.validarSenhasIguais }
    );

    //Aguarda carregar a chave pública antes de qualquer criptografia
    try {
      await this.cryptoService.loadPublicKey();
      console.log('Chave pública carregada com sucesso');
    } catch (error) {
      console.error('Error ao carregar chave pública', error);
    }
  }

    //Validação de CPF via API

  async validarCpf(): Promise<void> {
    const cpfControl = this.cadastroForm.get('cpf');
    const cpf = cpfControl?.value;

    if (!cpf) return;

    const isValid = await this.CpfValidationService.validarCpf(cpf);

    if (!isValid) {
    cpfControl?.setErrors({ invalidCpf: true });
    } else {
       // limpa erro se for válido
      if (cpfControl?.hasError('invalidCpf')) {
        const errors = { ...cpfControl.errors };
        delete errors['invalidCpf'];

        if (Object.keys(errors).length === 0) {
        cpfControl.setErrors(null);
        } else {
        cpfControl.setErrors(errors);
        }
      }
    }
  }

    //Validação de Data de Nascimento


  validarSenhasIguais(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async login(): Promise<void> {
    console.log('Status no submit:', this.cadastroForm!.status);
    console.log('Erros do formulário:', this.cadastroForm!.errors);

    if (this.cadastroForm.valid) {
      // Aqui criptografa os dados sensíveis antes de enviar

      const dadosLimpos = this.cadastroForm.value;
      try {
        // Criptografar os dados sensíveis assincronamente
        const dadosCripto = {
        nomeCompleto: dadosLimpos.nomeCompleto,
        genero: dadosLimpos.genero,
        datoNascimento: dadosLimpos.dataNascimento,
        terms: dadosLimpos.terms,
        cpf: this.cryptoService.encryptData(dadosLimpos.cpf),
        telefone: this.cryptoService.encryptData(dadosLimpos.telefone),
        email: this.cryptoService.encryptData(dadosLimpos.email),
        password: this.cryptoService.encryptData(dadosLimpos.password),
        confirmPassword: this.cryptoService.encryptData(dadosLimpos.confirmPassword)
      };

        // Enviar para o backend
        this.http.post(this.apiUrl, dadosCripto).subscribe({
          next: () => {
          alert('Cadastro realizado com sucesso!');
          },
        error: err => {
          console.error('Erro ao cadastrar:', err)
          alert('Erro ao realizar cadastro. Tente novamente.');
          }
        });
      } catch (err){
        console.error('Erro na criptografia:', err);
        alert('Erro ao processar os dados. Tente novamente.');
      }
    } else {
      Object.keys(this.cadastroForm.controls).forEach((key) => {
        this.cadastroForm.get(key)?.markAsTouched();
      });
    }
  }
}
