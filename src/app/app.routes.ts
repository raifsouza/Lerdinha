import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { CorridaComponent } from './pages/corrida/corrida.component';
import { AdminPromocoesComponent } from './pages/admin-promocoes/admin-promocoes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'promocoes', component: AdminPromocoesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'corrida', component: CorridaComponent }
];
