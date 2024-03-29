import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {HttpClient} from '@angular/common/http';
import { Router ,ActivatedRoute } from '@angular/router';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { WorkerRegisterService } from '../services/worker-register.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider} from "angularx-social-login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public loginservice:LoginService,
    private http : HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workerregister:WorkerRegisterService,
    private authService: SocialAuthService,
  ) {
    
    //this.signInWithFB();
    let user_id = localStorage.getItem('login_userid');

    if(user_id){
      this.loginservice.is_logged_in = true;
    }

    this.activatedRoute.queryParams.subscribe(params => {
      const oauthVerifier = params['oauth_verifier'];
      const oauthToken = params['oauth_token'];
      console.log(params);
      
      if (oauthToken && oauthVerifier) {
        this.saveAccessToken(oauthToken, oauthVerifier);
      }
    });
  }

  is_login : boolean =  false;
  // Login variables start 

  login_form : boolean  = false;
  success_message : string = "";
  error_message : string = "";
  success_div : boolean = false;
  error_div : boolean = false;


  // Login variables end

  // register variables start
  
  signup_form : boolean  = false;
  signup_success_message : string = "";
  signup_error_message : string = "";
  signup_success_div : boolean = false;
  signup_error_div : boolean = false;
  
  // register variables end 

    // Login Form
  signin = new FormGroup({
    signin: new FormGroup({
       //name_person: new FormControl(''),
       email: new FormControl(''),
       password: new FormControl(''),
       user_type: new FormControl(''),
       checked: new FormControl(''),
     })
   });

    worker_signup = new FormGroup({
      worker_signup: new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        coupon: new FormControl(''),
        checked: new FormControl('')
      })
    });

  

  saveAccessToken(oauthToken: string, oauthVerifier: string) {
    this.loginservice.saveAccessToken(oauthToken, oauthVerifier).subscribe(res => {
    
    console.log(res);
    
 
    let local :any = localStorage.getItem(this.loginservice.local_storage_local_midia_check_key);
    let local_storage_values = JSON.parse(local)
    local_storage_values.twitter = false;
    localStorage.setItem(this.loginservice.local_storage_local_midia_check_key,JSON.stringify(local_storage_values));
    
    this.media_check_function();
    })
  }

  redirectToTwitter() {
    
    this.loginservice.getRedirectUrl().subscribe((res: any) => {
      location.href = res.redirectUrl;
    })
  }

  ngOnInit(): void {
    
      /*******Getting facebook response data */
    this.authService.authState.subscribe((user) => {

      let local :any = localStorage.getItem(this.loginservice.local_storage_local_midia_check_key);
      let local_storage_values = JSON.parse(local)
      local_storage_values.facebook = false;
      localStorage.setItem(this.loginservice.local_storage_local_midia_check_key,JSON.stringify(local_storage_values));
      console.log('user');
      console.log(user);
      console.log(JSON.stringify(user));
      this.media_check_function();
    });
  }

  onSubmit() {
    let data = this.signin.value;
    console.log('data');
    console.log(data);
    this.loginservice.login(data)
    .subscribe(
      (response:any) => {   
        console.log(response)                       
        if(response['status'] == 'success'){

          this.success_message = response["msg"];
          this.loginservice.user_id = response["data"][0]['_id'];
          localStorage.setItem(this.loginservice.local_storage_login_userid_key,response["data"][0]['_id']);
          localStorage.setItem(this.loginservice.local_storage_key,JSON.stringify(response["data"][0]));

          this.loginservice.is_logged_in  = true;
          this.is_login                   = this.loginservice.is_logged_in;
          this.success_div                = true;
          this.error_div                  = false;
          this.signin.reset();

          setTimeout (() => {

            this.success_div  = false;
            this.login_form   = false;
            
            if(data.user_type == 0){
              this.router.navigate(['/my-account']);
            }else{
              //this.router.navigate(['/promoter-account']);
              this.router.navigate(['/my-account']);
            }
          }, 1000)
          
        }else{
          this.error_message = response["msg"];
          this.success_div = false;
          this.error_div = true;
        }
  
      },
      (error:any) => {                            
        console.error(error)
      }
    );
  }

  workerSignup(){

    let data = this.worker_signup.value
    this.workerregister.register(data)
    .subscribe(
      (response:any) => {                           
        console.log(response)
        if(response['status'] == 'success'){
          this.signup_success_message = response['msg'];
          
          localStorage.setItem('login_user_data',JSON.stringify(response["data"]));
          this.signup_success_div = true;
          this.signup_error_div = false;
          this.worker_signup.reset();
          this.worker_signup.reset();

          this.loginservice.is_logged_in = true; 
          this.is_login = this.loginservice.is_logged_in;

          setTimeout (() => {
            this.signup_success_div = false;
            this.signup_error_div = false;
            this.signup_form = false;
            this.router.navigate(['/']);
          }, 4000)
          
        }else{
          this.signup_error_message = response['msg'];
          this.signup_success_div = false;
          this.signup_error_div = true;
        }
  
      },
      (error:any) => {                            
        console.error(error)
      }
    );
  }

  media_check_function(){
    
    let local :any = localStorage.getItem(this.loginservice.local_storage_local_midia_check_key);
    let local_storage_values = JSON.parse(local)

    if(local_storage_values.twitter){
      console.log("in twiiter");
      this.redirectToTwitter();
    }else if(local_storage_values.facebook){
      console.log("in facebook");
      this.signInWithFB();
      
    }else if(local_storage_values.instagram){
      console.log("in insta");
      this.router.navigate(['/my-account']);
    }else if(local_storage_values.tiktok){
      console.log("in tiktok");
      this.router.navigate(['/my-account']);
    }else{
      this.router.navigate(['/my-account']);
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  logOut(){
    this.loginservice.logOut();
    this.router.navigate(['/']);
  }

}
