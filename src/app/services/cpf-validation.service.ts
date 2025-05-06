import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CpfValidationService {
  private apiUrl = 'url aqui';

  constructor(private http: HttpClient) {}

  async validarCpf(cpf: string): Promise<boolean> {
    const numericCPF = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    try {
      const response = await firstValueFrom(
        this.http.get<{ isValid: boolean }>(`${this.apiUrl}${numericCPF}`).pipe(
          map(res => res.isValid ?? false), // Garante que sempre retorna boolean
          catchError(() => of(false)) // Em caso de erro, retorna false
        )
      );
      return response;
    } catch {
      return false;
    }
  }
}
