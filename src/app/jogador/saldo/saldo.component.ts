import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../core/jogador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-saldo',
  imports: [CommonModule,FormsModule],
  templateUrl: './saldo.component.html',
})
export class SaldoComponent implements OnInit {
  nome: string = '';
  saldo: number = 0;
  apostas: any[] = [];

  constructor(private jogadorService: JogadorService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.jogadorService.obterSaldoEHistorico().subscribe((dados: any) => {
      this.nome = dados.nome;
      this.saldo = dados.saldo;
      this.apostas = dados.apostas;
    });
  }
}
