import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule,FormsModule],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  nome: string = '';
  saldo: number = 0;
  isAuthenticated: boolean = false;
  menuAberto = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object,private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();

    if (this.isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = this.authService.decodeToken(token);
        this.nome = decoded.nome;
        this.saldo = decoded.saldo;
      }
    }
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  irParaPainel(): void {
    this.router.navigate(['/painel-jogador']);
    this.menuAberto = false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.router.navigate(['/login']);
    this.menuAberto = false;
  }
}
