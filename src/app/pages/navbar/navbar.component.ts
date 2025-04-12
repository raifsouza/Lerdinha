import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [DecimalPipe] // Adiciona o DecimalPipe como provider
})
export class NavbarComponent {
  saldo: number = 100.00; // Simulação de saldo
  userFoto: string = 'assets/user-profile.png'; // Caminho da foto do usuário

  constructor(private decimalPipe: DecimalPipe) {}

  get saldoFormatado(): string {
    return this.decimalPipe.transform(this.saldo, '1.2-2') || '0.00';
  }

  substituirFotoUsuario() {
    this.userFoto = 'assets/default-user.png'; // Ícone padrão caso a foto não seja encontrada
  }
}
