import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tartaruga {
  cor: string;
  progresso: number;
  chegouNoFim: boolean;
}

@Component({
  selector: 'app-corrida',
  templateUrl: './corrida.component.html',
  imports: [CommonModule,FormsModule],
  styleUrls: ['./corrida.component.scss']
})

export class CorridaComponent implements OnInit {
  cores: string[] = ['Vermelha', 'Azul', 'Verde', 'Amarela', 'Roxa', 'Laranja', 'Rosa', 'Marron'];
  tartarugas: Tartaruga[] = [];
  corridaAtiva: boolean = false;
  subscription!: Subscription;
  tempoMaximo: number = 60000; // 60 segundos
  tempoDecorrido: number = 0;
  tartarugaSelecionada: string = '';
  mensagemVencedor: string = '';
  distanciaMaxima: number = 90; // Define a distância máxima da pista
  corridaFinalizada = false;
  venceu = false;
  mapaCores: { [key: string]: string } = {
    Vermelha: '#ff0000',
    Azul: '#0000ff',
    Verde: '#008000',
    Amarela: '#ffff00',
    Roxa: '#800080',
    Laranja: '#ffa500',
    Rosa: '#ff69b4',
    Marron: '#8b4513'
  };
  ngOnInit() {
    this.inicializarTartarugas();
  }

  inicializarTartarugas() {
    this.tartarugas = this.cores.map(cor => ({ cor, progresso: 0, chegouNoFim: false }));
    this.tartarugaSelecionada = this.tartarugas[Math.floor(Math.random() * this.tartarugas.length)].cor;
  }

  getCorHex(cor: string): string {
    const mapaCores: { [key: string]: string } = {
      'Vermelha': 'red',
      'Azul': 'blue',
      'Verde': 'green',
      'Amarela': 'yellow',
      'Roxa': 'purple',
      'Laranja': 'orange',
      'Rosa': 'pink',
      'Marron': 'brown'
    };
    return mapaCores[cor] || 'gray';
  }
  
  getContrasteCor(cor: string): string {
    const coresClaras = ['Amarela', 'Rosa'];
    return coresClaras.includes(cor) ? 'black' : 'white';
  }
  iniciarCorrida() {
    if (!this.tartarugaSelecionada) {
      alert('Selecione uma tartaruga antes de iniciar a corrida!');
      return;
    }

    this.inicializarTartarugas(); // Resetar as tartarugas antes de iniciar
    this.corridaAtiva = true;
    this.tempoDecorrido = 0;
    this.mensagemVencedor = '';
    this.subscription = interval(500).subscribe(() => this.atualizarCorrida());
  }

  atualizarCorrida() {
    if (this.tempoDecorrido >= this.tempoMaximo || this.todasTartarugasChegaram()) {
      this.encerrarCorrida();
      return;
    }
    
    this.tartarugas.forEach(tartaruga => {
      if (!tartaruga.chegouNoFim && Math.random() > 0.3) { // 70% de chance de avançar
        tartaruga.progresso += Math.random() * 5;
        if (tartaruga.progresso >= this.distanciaMaxima) {
          tartaruga.progresso = this.distanciaMaxima;
          tartaruga.chegouNoFim = true;
        }
      }
    });

    this.tempoDecorrido += 500;
  }

  todasTartarugasChegaram(): boolean {
    return this.tartarugas.every(tartaruga => tartaruga.chegouNoFim);
  }

  encerrarCorrida() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.corridaAtiva = false;
    this.tartarugas.sort(() => Math.random() - 0.5); // Mistura as tartarugas para evitar sempre a mesma vencedora
    const vencedora = this.tartarugas[this.tartarugas.length - 1];
    
    if (vencedora.cor === this.tartarugaSelecionada) {
      this.mensagemVencedor = 'Parabéns! Você venceu!';
    } else {
      this.mensagemVencedor = `A tartaruga mais lenta foi a de cor ${vencedora.cor}. Tente novamente!`;
    }
  }

  selecionarTartaruga(cor: string) {
    this.tartarugaSelecionada = cor;
  }
  
  finalizarCorrida(vencedor: string) {
    this.venceu = this.tartarugaSelecionada === vencedor;
    this.corridaFinalizada = true;
  }
  
  fecharModal() {
    this.corridaFinalizada = false;
  }
}