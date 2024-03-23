import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadoresComponent } from './components/jugadores/jugadores-list/jugadores.component';
import { LoginComponent } from './components/oauth/login/login.component';
import { SingUpComponent } from './components/oauth/sing-up/sing-up.component';
import { PerfilUserComponent } from './components/perfil-user/perfil-user.component';
import { UbicacionComponent } from './components/ubicaciones/ubicacion-list/ubicacion.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'singup', component: SingUpComponent, pathMatch: 'full' },
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'perfil-user', component: PerfilUserComponent },
  { path: 'ubicacion', component: UbicacionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
