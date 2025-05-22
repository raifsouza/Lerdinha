import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private publicKey!: CryptoKey; // colocar a chave pública do backend aqui

  constructor(private http: HttpClient) {}

  async loadPublicKey(): Promise<void> {
    const pem = await this.http.get('http://localhost:3000/api/public-key', { responseType: 'text' }).toPromise();
    const binaryDer = this.pemToArrayBuffer(pem!);
    this.publicKey = await crypto.subtle.importKey(
      'spki',
      binaryDer,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      true,
      ['encrypt']
    );
  }

   private pemToArrayBuffer(pem: string): ArrayBuffer {
    const b64 = pem.replace(/-----BEGIN PUBLIC KEY-----/, '')
                   .replace(/-----END PUBLIC KEY-----/, '')
                   .replace(/\s/g, '');
    const binaryString = window.atob(b64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  async encryptData(data: string): Promise<string> {
    if (!this.publicKey) {
      await this.loadPublicKey();
    }
    const encoder = new TextEncoder();
    const encoded = encoder.encode(data);
    const encrypted = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, this.publicKey, encoded);
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  }
}
