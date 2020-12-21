import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { InfluencerRegisterService } from '../services/influencer-register.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-influencer-signup',
  templateUrl: './influencer-signup.component.html',
  styleUrls: ['./influencer-signup.component.css']
})
export class InfluencerSignupComponent implements OnInit {
  influencer = new FormGroup({
    influencer_signup: new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm: new FormControl(''),
      checked: new FormControl(''),
      tiktok: new FormControl(''),
      insta: new FormControl(''),
      fb: new FormControl(''),
      twitter: new FormControl('')
    })
  });

  constructor(private influregservice:InfluencerRegisterService,private http : HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.influencer.value);
    console.log(this.influencer.value);
    const data = this.influencer.value
    this.influregservice.register(data)
    .subscribe(
      (response) => {                           
        console.log(response)
  
      },
      (error) => {                            
        console.error(error)
      }
    );
  }

}
