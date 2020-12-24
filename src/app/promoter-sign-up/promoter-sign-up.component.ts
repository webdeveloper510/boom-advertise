import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { PromoterRegisterService } from '../services/promoter-register.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-promoter-sign-up',
  templateUrl: './promoter-sign-up.component.html',
  styleUrls: ['./promoter-sign-up.component.css']
})
export class PromoterSignUpComponent implements OnInit {
  profileForm = new FormGroup({
    promoter_signup: new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm: new FormControl(''),
      checked: new FormControl('')
    })
  });

  constructor(
    private proregservice:PromoterRegisterService,
    private http : HttpClient,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  promoter_onSubmit() {
    console.warn(this.profileForm.value);
    console.log(this.profileForm.value);
    const data = this.profileForm.value
    this.proregservice.register(data)
    .subscribe(
      (response) => {                           
        console.log(response)
        this.router.navigate(['/promoter-account']);
      },
      (error) => {                            
     
      }
    );
  }

}
