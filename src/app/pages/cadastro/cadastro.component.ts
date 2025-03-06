import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CadastroComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
        gender: ['masculino', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) 9\d{4}-\d{4}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
        confirmPassword: ['', Validators.required],
        cep: ['', Validators.pattern(/^\d{5}-\d{3}$/)],
        terms: [false, Validators.requiredTrue]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control?.invalid && (control?.touched || control?.dirty);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value);
      alert('Cadastro realizado com sucesso!');
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}
