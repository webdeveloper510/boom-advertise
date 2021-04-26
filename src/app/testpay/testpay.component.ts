import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {HttpClient} from '@angular/common/http';
import { Router ,ActivatedRoute } from '@angular/router';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { WorkerRegisterService } from '../services/worker-register.service';
import { SocialAuthService } from "angularx-social-login";
@Component({
  selector: 'app-testpay',
  templateUrl: './testpay.component.html',
  styleUrls: ['./testpay.component.css']
})
export class TestpayComponent implements OnInit {

  constructor(
    public loginservice:LoginService,
    private http : HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workerregister:WorkerRegisterService,
    private authService: SocialAuthService,
  ) { }
  handler:any = null;
  v:any = null;
  ngOnInit() {
  
    this.loadStripe();
    
  }


  payApi() {
    console.log('strat');
    // this.loginservice.payApi().subscribe(res => {
    //   console.log(res);
    // })
  }
  
  pay(amount:any) {    
  
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HI9qMEXA7xfj1nHVxgdLB9TapBg5XlzSdvp991XoqXlLhePzY4I8l54WyzzRyDpMfWG8ubnIqUq7llRkahqiOsi00BDEFDLGg',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        console.log('token.id')
        console.log(token.id)
        this.v = token.id;
        console.log('my token'+this.v);
        alert('Token Created!!');
        
      }
    });
  
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
  
  }
  
  loadStripe() {
      
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HI9qMEXA7xfj1nHVxgdLB9TapBg5XlzSdvp991XoqXlLhePzY4I8l54WyzzRyDpMfWG8ubnIqUq7llRkahqiOsi00BDEFDLGg',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            console.log(token.id)
            alert('Payment Success!!');
          }
        });
      }
        
      window.document.body.appendChild(s);
    }
  }

}
