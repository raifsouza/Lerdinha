import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  corridas: any[] = [];
  modalRef?: BsModalRef;
  corridaPromocional: any;

  @ViewChild('promoModal') promoModal!: TemplateRef<any>;

  constructor(
    private http: HttpClient,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.buscarCorridas();
  }

  buscarCorridas() {
    this.http.get<any[]>('/api/corridas').subscribe(data => {
      this.corridas = data;

      const promocional = data.find(c => c.promocaoAtiva && c.status !== 'finalizada');
      if (promocional) {
        this.corridaPromocional = promocional;
        this.abrirModalPromocao();
      }
    });
  }

  abrirModalPromocao() {
    this.modalRef = this.modalService.show(this.promoModal);
  }

  criarCorrida() {
    this.http.post('/api/corridas', {}).subscribe(() => {
      this.buscarCorridas();
    });
  }

  finalizarCorrida(id: number) {
    this.http.patch(`/api/corridas/${id}/finalizar`, {}).subscribe(() => {
      this.buscarCorridas();
    });
  }

  togglePromocao(corrida: any) {
    const novaPromocao = !corrida.promocaoAtiva;
    this.http.patch(`/api/corridas/${corrida.id}`, {
      promocaoAtiva: novaPromocao
    }).subscribe(() => {
      this.buscarCorridas();
    });
  }
}
