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
  tiktok_fol : boolean  = false;
  twitter : boolean  = false;
  fb: boolean  = false;
  insta: boolean  = false;
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
      twitter: new FormControl(''),
      tiktok_followers: new FormControl(''),
      twitter_followers: new FormControl(''),
      fb_followers: new FormControl(''),
      insta_followers: new FormControl('')
    })
  });

  constructor(private influregservice:InfluencerRegisterService,private http : HttpClient) { }

  ngOnInit(): void {
  } 
  clickedon(){

    if(this.tiktok_fol == true){
      this.tiktok_fol= false;
      
    } else {
      this.tiktok_fol= true;
    }
  
 
  }
 
  clickedon1(){

   if(this.insta == true){
    this.insta= false;
    
  } else {
    this.insta= true;
  }

  }
  clickedon2(){
 if(this.fb == true){
  this.fb= false;
  
} else {
  this.fb= true;
}

  }
  clickedon3(){

if(this.twitter == true){
  this.twitter= false;
  
} else {
  this.twitter= true;
}
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
