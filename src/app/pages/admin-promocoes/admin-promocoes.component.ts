import { Component, OnInit } from '@angular/core';
import { PromocoesService } from '../../core/promocoes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-promocoes',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-promocoes.component.html'
})
export class AdminPromocoesComponent implements OnInit {
  promo = { titulo: '', taxaPremio: 0.7, expiraEm: '' };
  promocoes: any[] = [];

  constructor(private promoService: PromocoesService) {}

  ngOnInit(): void {
    this.listar();
  }

  criarPromo() {
    const payload = {
      ...this.promo,
      taxaPremio: this.promo.taxaPremio / 100, 
      expiraEm: new Date(this.promo.expiraEm)
    };
    this.promoService.criarPromo(payload).subscribe(() => {
      this.promo = { titulo: '', taxaPremio: 0.7, expiraEm: '' };
      this.listar();
    });
  }

  listar() {
    this.promoService.listarAtivas().subscribe((res: any) => this.promocoes = res);
  }

  desativar(id: number) {
    this.promoService.mudarEstado(id, false).subscribe(() => this.listar());
  }
}
