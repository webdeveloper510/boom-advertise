import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PromoterRegisterService } from '../services/promoter-register.service';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { InfluencerRegisterService } from '../services/influencer-register.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
                private proregservice:PromoterRegisterService,
                private http : HttpClient,
                private router: Router,
                private influregservice:InfluencerRegisterService,
                ) { }

  ngOnInit(): void {
  }

  // Promotor variables start
  tiktok_fol : boolean  = false;
  twitter : boolean  = false;
  fb: boolean  = false;
  insta: boolean  = false;
  promotor_login_form : boolean  = false;
  promotor_success_message : string = "Signup Successfully";
  promotor_error_message : string = "Signup Failed";
  promotor_success_div : boolean = false;
  promotor_error_div : boolean = false;
  
  // Promotor variables end

  
  // influnncer variables start
  
  influnncer_login_form : boolean  = false;
  influnncer_success_message : string = "Signup Successfully";
  influnncer_error_message : string = "Signup Failed";
  influnncer_success_div : boolean = false;
  influnncer_error_div : boolean = false;
  
  // Promotor variables end

  profileForm = new FormGroup({
    promoter_signup: new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm: new FormControl(''),
      checked: new FormControl('')
    })
  });

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
  openPromotorForm(){ this.promotor_login_form  = true; }
  closePromotorForm(){ this.promotor_login_form  = false; }
  openInfluencerForm(){ this.influnncer_login_form  = true; }
  closeInfluencerForm(){ this.influnncer_login_form  = false; }

  promotersignup(){

    let data = this.profileForm.value
    this.proregservice.register(data)
    .subscribe(
      (response:any) => {                           
        if(response['status'] == 'success'){
          this.promotor_success_div = true;
          this.promotor_error_div = false;
          this.profileForm.reset();
          setTimeout (() => {
            this.promotor_success_div = false;
            this.promotor_login_form = false;
            this.router.navigate(['/influencer-account']);
          }, 2000)
          
        }else{
          this.promotor_success_div = false;
          this.promotor_error_div = true;
        }
  
      },
      (error:any) => {                            
        console.error(error)
      }
    );
  }

  influencerSignup(){

    console.warn(this.influencer.value);
    console.log(this.influencer.value);
    let data = this.influencer.value
    this.influregservice.register(data)
    .subscribe(
      (response:any) => {                           
        if(response['status'] == 'success'){
          this.influnncer_success_div = true;
          this.influnncer_error_div = false;
          this.influencer.reset();
          setTimeout (() => {
            this.influnncer_success_div = false;
            this.influnncer_login_form = false;
            this.router.navigate(['/influencer-account']);
          }, 2000)
          
        }else{
          this.influnncer_success_div = false;
          this.influnncer_error_div = true;
        }
  
      },
      (error:any) => {                            
        console.error(error)
      }
    );

  }

}

