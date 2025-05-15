import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class JogadorService {
  private readonly api = '${environment.apiUrl}/jogador';

  constructor(private http: HttpClient) {}

  obterSaldoEHistorico() {
    return this.http.get(`${this.api}/saldo`);
  }
}
