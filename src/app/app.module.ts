import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminPromocoesModule } from './pages/admin-promocoes/admin-promocoes.module';
import { ModalModule } from 'ngx-bootstrap/modal'
@NgModule({
  declarations:[
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    CadastroComponent,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    AdminPromocoesModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ModalModule.forRoot(),
  ],
  providers: [],
})
export class PagesModule { }

