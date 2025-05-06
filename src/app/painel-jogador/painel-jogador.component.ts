import { Component, inject, OnInit, PLATFORM_ID, TemplateRef } from '@angular/core';
import { UserService } from '../core/user.service'; 
import { AuthService } from '../core/auth.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-painel-jogador',
  imports: [CommonModule,FormsModule],
  templateUrl: './painel-jogador.component.html',
  styleUrls: ['./painel-jogador.component.scss']
})

export class PainelJogadorComponent implements OnInit {
  nome: string = '';
  saldo: number = 0;
  apostas: any[] = [];
  chavePix: string = '';
  mostrarConfirmacao = false;
  exibirModalConfirmacao: boolean = false;
  private platformId = inject(PLATFORM_ID);


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.carregarPainel();
    }
  }

  carregarPainel(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    this.http.get('http://localhost:3000/usuarios/painel', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe((res: any) => {
      this.saldo = res.saldo;
      this.chavePix = res.chavePix ?? '';
      this.apostas = res.apostas.map((aposta: any) => ({
        corridaId: aposta.corrida?.id ?? '?',
        tartaruga: aposta.tartaruga,
        vencedora: aposta.tartaruga === aposta.corrida?.tartarugaVencedora,
        premio: aposta.premio ?? 0
      }));
    });
  }
  
  resgatarPix(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    this.http.patch('http://localhost:3000/usuarios/resgatar-pix', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        alert(`✅ ${res.mensagem}\n💸 Valor: R$ ${res.valor}\n📱 Chave PIX: ${res.chavePix}`);
        this.carregarPainel();
      },
      error: (err) => {
        alert(`❌ Erro ao resgatar PIX: ${err.error.message || err.message}`);
      }
    });
  }

  atualizarChavePix(): void {

    const token = localStorage.getItem('token');
    if (!token) return;
  
    this.http.patch('http://localhost:3000/usuarios/chave-pix', { chavePix: this.chavePix }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        alert(`✅ ${res.mensagem}`);
      },
      error: (err) => {
        alert(`❌ Erro ao atualizar chave PIX: ${err.error.message || err.message}`);
      }
    });
  }


fecharConfirmacao(): void {
  this.mostrarConfirmacao = false;
}

confirmarResgatePix(): void {
  const token = localStorage.getItem('token');
  if (!token) return;

  this.http.post('http://localhost:3000/usuarios/resgatar-pix', {}, {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe(() => {
    alert('Solicitação de resgate enviada com sucesso!');
    this.mostrarConfirmacao = false;
    this.carregarPainel(); 
  }, error => {
    alert('Erro ao solicitar resgate.');
    console.error(error);
  });

  this.fecharConfirmacao();
}

salvarChavePix(): void {
  const token = localStorage.getItem('token');
  if (!token || !this.chavePix) {
    alert('Token ou chave PIX inválida');
    return;
  }

  this.http.patch('http://localhost:3000/usuarios/chave-pix', 
    { chavePix: this.chavePix }, 
    { headers: { Authorization: `Bearer ${token}` } }
  ).subscribe(() => {
    alert('Chave PIX atualizada com sucesso!');
  }, error => {
    alert('Erro ao atualizar a chave PIX.');
    console.error(error);
  });
}

abrirModal() {
  this.exibirModalConfirmacao = true;
  console.log("ESTOU AQUI!!!!");
}

fecharModalConfirmacao(){
  this.exibirModalConfirmacao = false;
}

}
