import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadoresComponent } from './components/jugadores/jugadores-list/jugadores.component';
import { LoginComponent } from './components/oauth/login/login.component';
import { SingUpComponent } from './components/oauth/sing-up/sing-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'singup', component: SingUpComponent, pathMatch: 'full' },
  { path: 'jugadores', component: JugadoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
