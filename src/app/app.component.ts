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
    if(sessionStorage.getItem('access_token'))
    this.isLoggedIn=true;
    
}

NgOnInit():void{
 
}
title = 'SPAPadel';
}
