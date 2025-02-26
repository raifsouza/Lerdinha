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

  ngOnInit() {
    this.inicializarTartarugas();
  }

  inicializarTartarugas() {
    this.tartarugas = this.cores.map(cor => ({ cor, progresso: 0, chegouNoFim: false }));
    this.tartarugaSelecionada = this.tartarugas[Math.floor(Math.random() * this.tartarugas.length)].cor;
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
}