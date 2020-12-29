import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'boom-advertise';
   $: any;
  
   constructor(private LoginService : LoginService){

    this.LoginService.loginCheck();
   }
}

