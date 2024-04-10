import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadoresComponent } from './components/jugadores/jugadores-list/jugadores.component';
import { LoginComponent } from './components/oauth/login/login.component';
import { SingUpComponent } from './components/oauth/sing-up/sing-up.component';
import { PerfilUserComponent } from './components/perfil-user/perfil-user.component';
import { UbicacionComponent } from './components/ubicaciones/ubicacion-list/ubicacion.component';
import { PartidasComponent } from './components/partidas/partidas-list/partidas.component';
import { ParejasComponent } from './components/parejas/parejas-list/parejas.component';
import { AuthGuard } from './authGuard';
import { LoginGuard } from './loginGuard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' ,canActivate: [LoginGuard]},
  { path: 'singup', component: SingUpComponent, pathMatch: 'full' },
  { path: 'jugador', component: JugadoresComponent,  canActivate: [AuthGuard] },
  { path: 'pareja', component: ParejasComponent ,  canActivate: [AuthGuard]},
  { path: 'perfil-user', component: PerfilUserComponent ,  canActivate: [AuthGuard]},
  { path: 'ubicacion', component: UbicacionComponent,  canActivate: [AuthGuard] },
  { path: 'partidas', component: PartidasComponent,  canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' } // Redirige a https://ejemplo.com si la ruta no coincide
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
