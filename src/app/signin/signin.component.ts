import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  success_message : string = "Login successfully...";
  error_message : string = "Invalid credentials!";
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

  onSubmit() {
    // TODO: Use EventEmitter with form value
      // this.http.post(this.loginservice.apiUrl,data)
      
    // 
      
    console.log(this.signin.value);
    const data = this.signin.value
    this.loginservice.login(data)
    .subscribe(
      (response) => {                           
        console.log(response)
        if(response.status == 'success'){
            this.success_div = true;
            this.error_div = false;
           this.router.navigate(['/influencer-account']);
        }else{
          this.success_div = false;
            this.error_div = true;
        }
      },
      (error) => {                            
        console.error(error)
        this.success_div = false;
        this.error_div = true;
      }
    );
  }

  


}
