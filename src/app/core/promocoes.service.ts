import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PromocoesService {
  private baseUrl = 'http://localhost:3000/admin/promocoes';

  constructor(private http: HttpClient) {}

  criarPromo(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  listarAtivas() {
    return this.http.get(`${this.baseUrl}/ativas`);
  }

  mudarEstado(id: number, ativa: boolean) {
    return this.http.patch(`${this.baseUrl}/${id}/estado`, { ativa });
  }
}
