import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  passwordFieldType: { [key: string]: string } = {
    password: 'password',
    confirmPassword: 'password'
  };
  passwordIcon: { [key: string]: string } = {
    password: 'fa-eye',
    confirmPassword: 'fa-eye'
  };

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*$')]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      birthdate: [''],
      gender: ['', [Validators.required]],
      phone: ['', [this.phoneValidator]],
      mobile: ['', [Validators.required, this.mobileValidator]],
      password: ['', [
        Validators.required,
        Validators.minLength(8), // Validação de comprimento
        this.passwordValidator // Validação personalizada
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validação de Senha
  passwordValidator(control: any) {
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const valid = hasUpperCase && hasLowerCase && hasNumber;

    return valid ? null : { invalidPassword: true };
  }

  // Validação para confirmar senha
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  // Validação do telefone (exemplo)
  phoneValidator(control: any) {
    const value = control.value;
    const valid = /^\d{10,11}$/.test(value);
    return valid ? null : { invalidPhone: true };
  }

  // Validação do celular (exemplo)
  mobileValidator(control: any) {
    const value = control.value;
    const valid = /^\d{11}$/.test(value);
    return valid ? null : { invalidMobile: true };
  }

  togglePasswordVisibility(field: string) {
    if (this.passwordFieldType[field] === 'password') {
      this.passwordFieldType[field] = 'text';
      this.passwordIcon[field] = 'fa-eye-slash';
    } else {
      this.passwordFieldType[field] = 'password';
      this.passwordIcon[field] = 'fa-eye';
    }
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
    } else {
      console.log("Formulário inválido");
    }
  }
}
