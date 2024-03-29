import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PromoterRegisterService } from '../services/promoter-register.service';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { InfluencerRegisterService } from '../services/influencer-register.service';
import { LoginService } from '../services/login.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Console } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  is_logged_in      : any ;
  customer_terms    : boolean = false;
  influencer_terms  : boolean = false;

  constructor(
                private proregservice:PromoterRegisterService,
                private http : HttpClient,
                private router: Router,
                private influregservice:InfluencerRegisterService,
                public login_service:LoginService,
                private authService: SocialAuthService
                ) {

    this.is_logged_in = login_service.is_logged_in;
  }

  ngOnInit(): void {

    
    // this.authService.authState.subscribe((user) => {
    //   console.log(user);
     
    // });
  }

  // common variables start
  is_login : boolean =  this.login_service.is_logged_in;
 // common variables end

  // Promotor variables start
  tiktok_fol : boolean  = false;
  twitter : boolean  = false;
  fb: boolean  = false;
  insta: boolean  = false;
  promotor_login_form : boolean  = false;
  promotor_success_message : string = "";
  promotor_error_message : string = "";
  promotor_success_div : boolean = false;
  promotor_error_div : boolean = false;
  
  // Promotor variables end

  
  // influnncer variables start
  
  influnncer_login_form : boolean  = false;
  influnncer_success_message : string = "";
  influnncer_error_message : string = "";
  influnncer_success_div : boolean = false;
  influnncer_error_div : boolean = false;
  
  // Promotor variables end

  profileForm = new FormGroup({
    promoter_signup: new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm: new FormControl(''),
      checked: new FormControl('', [Validators.required]), 
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
 

  promotersignup(){

    console.log(this.profileForm.value);
   
    let data = this.profileForm.value;
   
    if(!data.promoter_signup.checked){
      
      this.customer_terms = true;
      return;
    } else {

      this.customer_terms = false;
    }
  

    this.proregservice.register(data)
    .subscribe(
      (response:any) => { 
        
        console.log('response');
        console.log(response);
      
        if(response['status'] == 'success'){

          localStorage.setItem(this.login_service.local_storage_login_userid_key,response["data"]['_id']);
          localStorage.setItem(this.login_service.local_storage_key,JSON.stringify(response["data"]));

          this.promotor_success_message = response['msg'];
          this.is_login = true;
          this.promotor_success_div = true;
          this.promotor_error_div = false;
          this.profileForm.reset();
          this.login_service.is_logged_in = true;
          this.login_service.user_id  = response["data"]['_id'];

          setTimeout (() => {
            this.promotor_success_div = false;
            this.promotor_login_form = false;
            this.router.navigate(['/']);
          }, 3000)
          
        }else{
          
          this.promotor_error_message = response['msg'];
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
    
    console.log(this.influencer.value);
    
    let twitter   = this.influencer.value.influencer_signup.twitter;
    let tiktok    = this.influencer.value.influencer_signup.tiktok;
    let instagram = this.influencer.value.influencer_signup.insta;
    let facebook  = this.influencer.value.influencer_signup.fb;

    let local_midia_check:any= {twitter:false,facebook:false,tiktok:false,instagram:false};
    
    local_midia_check.twitter     = twitter ? true : false;
    local_midia_check.tiktok      = tiktok ? true : false;
    local_midia_check.instagram   = instagram ? true : false;
    local_midia_check.facebook    = facebook ? true : false;

    this.influencer.value.influencer_signup.twitter = local_midia_check.twitter;
    this.influencer.value.influencer_signup.tiktok  = local_midia_check.tiktok;
    this.influencer.value.influencer_signup.insta   = local_midia_check.instagram;
    this.influencer.value.influencer_signup.fb      = local_midia_check.facebook;
    
    let data = this.influencer.value;

    if(!data.influencer_signup.checked){

      this.influencer_terms = true;
      return;
    } else {
      this.influencer_terms = false;
    }
    
    this.influregservice.register(data)
    .subscribe(
      (response:any) => {     
        
        console.log(response);
        
        if(response['status'] == 'success'){

          console.log(response);
          localStorage.setItem("local_midia_check", JSON.stringify(local_midia_check));
          localStorage.setItem(this.login_service.local_storage_login_userid_key,response["data"]['_id']);
          localStorage.setItem(this.login_service.local_storage_key,JSON.stringify(response["data"]));

          this.influnncer_success_message = response['msg'];
          this.is_login = true;
          this.influnncer_success_div = true;
          this.influnncer_error_div = false;
          this.influencer.reset();
          this.login_service.is_logged_in = true;
          this.login_service.user_id  = response["data"]['_id'];


          setTimeout (() => {
            this.influnncer_success_div = false;
            this.influnncer_login_form = false;

            // if(local_midia_check.twitter == true) {
            //   this.redirectToTwitter();
            // }
            if(local_midia_check.facebook == true){
              this.signInWithFB();
             //this.signInWithFB();
             // this.signInWithFB();
             
            }

            if(local_midia_check.twitter == true && local_midia_check.facebook != true){
              this.redirectToTwitter();
             
             
            }

            this.router.navigate(['/my-account']);
          }, 3000)
          
        }else{
          this.influnncer_error_message = response['msg'];
          this.influnncer_success_div = false;
          this.influnncer_error_div = true;
        }
  
      },
      (error:any) => {                            
        console.error(error)
      }
    );

  }

  redirectToTwitter() {
    
    this.login_service.getRedirectUrl().subscribe((res: any) => {
      
      location.href = res.redirectUrl;
      

      
    })
  }

  //  fbLogin() {
  //   this.login_service.fbLogin().then(() => {
  //     console.log('Called service from login component');
  //     // console.log(response);
  //    // ---this.router.navigate(['dashboard']);
  //   });
  // }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    
  }



}

