import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JogadorService {
  private readonly api = 'http://localhost:3000/jogador';

  constructor(private http: HttpClient) {}

  obterSaldoEHistorico() {
    return this.http.get(`${this.api}/saldo`);
  }
}
