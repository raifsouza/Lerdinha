import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CpfValidationService } from '../../services/cpf-validation.service';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, LucideAngularModule, ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [provideNgxMask({
    dropSpecialCharacters: false,
    validation: true,
    })
  ],
})

export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  cpfStatus: string | null = null;
  mostrarModal = false;

  ngOnInit(): void {
    this.cadastroForm = this.fb.group(
      {
        primeiroNome: ['', [Validators.required, Validators.minLength(2)]],
        ultimoNome: ['', [Validators.required, Validators.minLength(2)]],
        cpf: ['', Validators.required],
        genero: ['', Validators.required],
        telefone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dataNascimento: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
        confirmPassword: ['', Validators.required],
        cep: ['',],
        terms: [false, Validators.requiredTrue]
      },
      { validators: this.validarSenhasIguais }
    );
  }

  abrirModal(event: Event) {
    event.preventDefault();
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  icons = { Eye, EyeOff };

  constructor(private fb: FormBuilder, private CpfValidationService: CpfValidationService) {
    this.cadastroForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      dataNascimento: ['', [Validators.required]],

    })
  }

  async validarCpf(): Promise<void> {
    const cpf = this.cadastroForm.get('cpf')?.value;
    if (!cpf) return;

    const isValid = await this.CpfValidationService.validarCpf(cpf);

    if (!isValid) {
      this.cadastroForm.get('cpf')?.setErrors({ invalidCpf: true });
    }
  }

  validarDataNascimento(): void {
    const dataNascimento = this.cadastroForm.get('dataNascimento')?.value;
    if (!dataNascimento) return;

    const dataNascimentoDate = new Date(dataNascimento);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimentoDate.getFullYear();

    if (idade < 18) {
      this.cadastroForm.get('dataNascimento')?.setErrors({ underAge: true });
    }
  }

  validarSenhasIguais(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  botaoVisibilidadeSenha(): void {
    this.showPassword = !this.showPassword;
  }

  botaoVisibilidadeConfirmacaoSenha(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      console.log('Form submitted:', this.cadastroForm.value);
      alert('Cadastro realizado com sucesso!');
    } else {
      Object.keys(this.cadastroForm.controls).forEach(key => {
        this.cadastroForm.get(key)?.markAsTouched();
      });
    }
  }
}
