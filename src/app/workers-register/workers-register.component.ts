import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-workers-register',
  templateUrl: './workers-register.component.html',
  styleUrls: ['./workers-register.component.css']
})
export class WorkersRegisterComponent implements OnInit {
  influencer = new FormGroup({
    influencer_signup: new FormGroup({
       //name_person: new FormControl(''),
       email: new FormControl(''),
       password: new FormControl(''),
      // confirm: new FormControl(''),
       checked: new FormControl(''),
      // tiktok: new FormControl(''),
     //  insta: new FormControl(''),
     //  fb: new FormControl(''),
     //  twitter: new FormControl('')
     })
   });
  constructor() {


   }
   onSubmit() {
    // TODO: Use EventEmitter with form value
      // this.http.post(this.loginservice.apiUrl,data)
    console.log(this.influencer.value);
    const data = this.influencer.value

  }
  ngOnInit(): void {
  }

}
