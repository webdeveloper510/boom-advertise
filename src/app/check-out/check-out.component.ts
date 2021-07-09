import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormGroup, FormControl ,FormBuilder, Validators } from '@angular/forms';
import { MyAccountService } from '../services/my-account.service';
import {HttpClient} from '@angular/common/http';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  

  ngOnDestroy() {
    localStorage.removeItem('buy_media');
  }

  
  
  paymentForm = new FormGroup({
    name              : new FormControl(''),
    email             : new FormControl(""),
    password          : new FormControl(""),
    repossword        : new FormControl(""),
    phone             : new FormControl(""),
    description       : new FormControl("",[Validators.required]),
    stripe_email      : new FormControl("",[Validators.required]),
    stripe_username   : new FormControl("",[Validators.required]),
    stripe_cardnumber : new FormControl("",[Validators.required]),
    stripe_month_year : new FormControl("",[Validators.required]),
    stripe_cvc        : new FormControl("",[Validators.required]),
    stripe_zipcode    : new FormControl("",[Validators.required]),
  });

  ngOnInit(): void {
    this.paymentForm.patchValue({
      description : this.checkout.description,
    });
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
    //data.total_amount     = parseInt(this.checkout.total_amount);
    data.total_amount     = 10;
    data.influencer_email = this.checkout.email;
    data.user_description = this.checkout.description;
    data.influencer_id    = this.checkout.influencer_id;
    data.media_option     = this.checkout.media_option;
    data.media_key        = this.checkout.media_key;
    console.log(data);
    //console.log(this.checkout.influencer_id.media_option);return;
    this.MyAccountService.payment(data).subscribe(
      (response:any) =>{
        
        console.log(response);
        return;
        setTimeout(() => {
      
        
          if(response?.code == 100){
          
            localStorage.removeItem('buy_media');
            this.swalAlert(response.message,'success',response?.code);

          }else if(response?.code == 201){

            this.swalAlert(response.message,'warning',response?.code);
          }else {
            
            this.swalAlert(response.message.raw.message,'warning',response?.code);
            
          }

        }, 3000);

      }
    )
      return false;
  }

  swalAlert(title:any , message_type : any, code : any){
    Swal.fire({
      title: title,
      //text: 'You will not be able to recover this file!',
      icon: message_type,
      showCancelButton: false,
      confirmButtonText: 'OK',
      //cancelButtonText: 'No, keep it'
    }).then((result) => {
      
      if(code == 100){
        this.location.back();
      }
    })
  }
 
}
