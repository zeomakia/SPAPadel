import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadoresComponent } from './components/jugadores/jugadores-list/jugadores.component';
import { LoginComponent } from './components/oauth/login/login.component';
import { SingUpComponent } from './components/oauth/sing-up/sing-up.component';
import { PerfilUserComponent } from './components/perfil-user/perfil-user.component';
import { UbicacionComponent } from './components/ubicaciones/ubicacion-list/ubicacion.component';
import { PartidasComponent } from './components/partidas/partidas-list/partidas.component';
import { ParejasComponent } from './components/parejas/parejas-list/parejas.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'singup', component: SingUpComponent, pathMatch: 'full' },
  { path: 'jugador', component: JugadoresComponent },
  { path: 'pareja', component: ParejasComponent },
  { path: 'perfil-user', component: PerfilUserComponent },
  { path: 'ubicacion', component: UbicacionComponent },
  { path: 'partidas', component: PartidasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
