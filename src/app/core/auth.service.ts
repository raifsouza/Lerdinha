import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://sua-api.com/auth/login';

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  getUserId(token: string): number | null {
    try {
      const decoded = this.jwtService.decode(token) as { sub: number };
      return decoded?.sub ?? null;
    } catch {
      return null;
    }
  }
}
