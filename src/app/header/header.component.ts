import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {HttpClient} from '@angular/common/http';
import { Router ,ActivatedRoute } from '@angular/router';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { WorkerRegisterService } from '../services/worker-register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

  constructor(
    public loginservice:LoginService,
    private http : HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workerregister:WorkerRegisterService,
  ) { 

    this.activatedRoute.queryParams.subscribe(params => {
      const oauthVerifier = params['oauth_verifier'];
      const oauthToken = params['oauth_token'];
      
      
      if (oauthToken && oauthVerifier) {
        console.log("vijay rana");
        console.log(params);
        this.saveAccessToken(oauthToken, oauthVerifier);
      }
    });
  }

  saveAccessToken(oauthToken: string, oauthVerifier: string) {
    this.loginservice.saveAccessToken(oauthToken, oauthVerifier).subscribe(res => {
    console.log(res);
    })
  }

  redirectToTwitter() {
    
    this.loginservice.getRedirectUrl().subscribe((res: any) => {
      location.href = res.redirectUrl;
    })
  }



  ngOnInit(): void {
  }

  openLoginForm(){ this.login_form = true; }
  closeLoginForm(){ this.login_form = false; }
  openSignupForm(){ this.signup_form = true; }
  closeSignupForm(){ this.signup_form = false; }


  onSubmit(number:any = "") {
   
    if(number != 1){

      alert("vijayh");
      return;
    }
    
    console.log(this.signin.value);
    let data = this.signin.value
    this.loginservice.login(data)
    .subscribe(
      (response:any) => {   
        console.log(response)                       
        if(response['status'] == 'success'){

          this.success_message = response["msg"];
          localStorage.setItem('login_userid',response["data"][0]['_id']);
          localStorage.setItem('logindata',JSON.stringify(response["data"][0]));

          this.loginservice.is_logged_in  = true;
          this.is_login                   = this.loginservice.is_logged_in;
          this.success_div                = true;
          this.error_div                  = false;
          this.signin.reset();

          setTimeout (() => {

            this.success_div  = false;
            this.login_form   = false;
            if(response["data"][0]['user_type'] == 0){
              this.router.navigate(['/my-account']);
            }else{
              this.router.navigate(['/promoter-account']);
            }
          }, 2000)
          
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

  



  logOut(){
    this.loginservice.logOut();
    this.router.navigate(['/']);
  }

}
