import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
   user?:string;
  ngOnInit(){
    if(sessionStorage.getItem('user') !== null){
      this.user=sessionStorage.getItem('user')!;
    };

  }
}
