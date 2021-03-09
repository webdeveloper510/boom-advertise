import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl ,FormBuilder, Validators } from '@angular/forms';
import { MyAccountService } from '../services/my-account.service';
import {HttpClient} from '@angular/common/http';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})

export class CheckOutComponent implements OnInit {

  paypal_image  : string  = "/assets/images/Paypal-icon.png";
  credit_card   : string  = "/assets/images/credit-card.png";
  month_year    : any     = '';
  checkout      : any     = ''; 
  previousUrl   : string  = '';
  constructor(private MyAccountService:MyAccountService, private router : Router,private location: Location) {

    

    let buy_media = localStorage.getItem('buy_media');

    if(buy_media){

      this.checkout = JSON.parse(buy_media);
      console.log(this.checkout)
    } else {

      this.router.navigate(['/influencers']);
    }

  }

  
  paymentForm = new FormGroup({
    name              : new FormControl('', [Validators.required]),
    email             : new FormControl("",[Validators.required]),
    password          : new FormControl("",[Validators.required]),
    repossword        : new FormControl("",[Validators.required]),
    phone             : new FormControl("",[Validators.required]),
    description       : new FormControl("",[Validators.required]),
    stripe_email      : new FormControl("",[Validators.required]),
    stripe_username   : new FormControl("",[Validators.required]),
    stripe_cardnumber : new FormControl("",[Validators.required]),
    stripe_month_year : new FormControl("",[Validators.required]),
    stripe_cvc        : new FormControl("",[Validators.required]),
    stripe_zipcode    : new FormControl("",[Validators.required]),
  });

  ngOnInit(): void {
  }

  monthYear(value :any){
   
    let val = value.replace('/','');
    val     = val.split('');
    let len = val.length <= 6 ? val.length : 6;
    let str = '';

    for(var i=0; i < len; i++){
      
      if(i==2){
          str += '/';
      }    
      str += val[i];
    }

    this.month_year = str;
  }

  payment(){

    let data              = this.paymentForm.value;
    data.total_amount     = parseInt(this.checkout.total_amount);
    data.influencer_email = this.checkout.email;
    data.user_description      = this.checkout.description;
    
    this.MyAccountService.payment(data).subscribe(
      (response:any) =>{
        console.log(response);
        if(response?.code == 100){
          alert(response.message);
          localStorage.removeItem('buy_media');
          this.location.back();
        }else if(response?.code == 201){
          alert(response.message);

        }else {
          alert(response.message.raw.message);
        }
      }
    )
      return false;
  }
 
}
