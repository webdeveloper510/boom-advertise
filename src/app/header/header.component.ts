import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login_form : boolean  = false;
  success_message : string = "Login Successfully";
  error_message : string = "Login Failed";
  success_div : boolean = false;
  error_div : boolean = false;
  signin = new FormGroup({
    signin: new FormGroup({
       //name_person: new FormControl(''),
       email: new FormControl(''),
       password: new FormControl(''),
       user_type: new FormControl(''),
       checked: new FormControl(''),
      // tiktok: new FormControl(''),
     //  insta: new FormControl(''),
     //  fb: new FormControl(''),
     //  twitter: new FormControl('')
     })
   });

  constructor(private loginservice:LoginService,private http : HttpClient,private router: Router,) { }

  ngOnInit(): void {
  }

  openLoginForm(){ this.login_form = true; }
  closeLoginForm(){ this.login_form = false; }

  onSubmit() {

    console.log("vijay here");
    
    
    console.log(this.signin.value);
    console.log(this.loginservice.apiUrl+"/login");
    let data = this.signin.value;
    this.http.post(this.loginservice.apiUrl+"/login",data)
    .subscribe(
      (response) => {                           
        console.log(response)
  
      },
      (error) => {                            
        console.error(error)
      }
    );

    console.log("vijay");
  }

}
