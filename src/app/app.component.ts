import { Component } from '@angular/core';
import { OauthService } from './services/oauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn?: boolean;
  constructor(private authService: OauthService) { // Inyecta el servicio de autenticación
    this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
 
}
title = 'SPAPadel in kubernetes!';
}
