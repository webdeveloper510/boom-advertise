import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MyAccountService } from '../services/my-account.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { PromoterRegisterService } from '../services/promoter-register.service';
@Component({
  selector: 'app-influencer-account',
  templateUrl: './influencer-account.component.html',
  styleUrls: ['./influencer-account.component.css']
})
export class InfluencerAccountComponent implements OnInit {
  id:any ;
  influencer_data : any = {};
  request_quotes_model : boolean = false;
  tiktok_price_div : boolean = true;
  facebook_price_div : boolean = false;
  instagram_price_div : boolean = false;
  twitter_price_div : boolean = false;
  media_price : any = {
                        tiktok : { post_price : 0, story_price : 0},
                        instagram : { post_price : 0, story_price : 0},
                        facebook : { post_price : 0, story_price : 0},
                        twitter : { post_price : 0, story_price : 0},
                      };

  media_post : any =  {
    
                        tiktok    : [],
                        instagram : [],
                        facebook  : [],
                        twitter   : [],
                      };

  constructor(
              private _Activatedroute : ActivatedRoute,
              private MyAccountService:MyAccountService,
              private LoginService:LoginService,
              private proregservice:PromoterRegisterService,
              ) {
               
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
      console.log(this.id);
    });
  }

  request_quotes = new FormGroup({
    description  : new FormControl(''),
    post_id : new FormControl(''),
    influencerid : new FormControl(''),
    media_type  : new FormControl(''),
 });

  ngOnInit(): void {
    this.singleInfluencer();
  }

  singleInfluencer(){
    console.log("functionm calling");
    this.MyAccountService.singleInfluencer(this.id).subscribe(
      (response:any) => {
        console.log(response);
        
        if(response.statusCode == 200){

          this.influencer_data = response.mydata;
          this.media_price = response.mydata.price_data;
          this.media_post = response.mydata.posts;
         
        }
      }
    );
  }

  openRequestModel(post_id:any,influencerid:any,media_type:any){
    
    this.request_quotes_model = true;
    this.request_quotes.patchValue({  media_type  : media_type, post_id  : post_id ,influencerid : influencerid }); // put values in form
  }

  sendRequestQuotes(){
    
    let data = this.request_quotes.value
    data.user_id = this.LoginService.user_id;
    
    this.proregservice.sendRequestQuotes(data).subscribe(
      (response : any) => {

        console.log(response);
        this.request_quotes_model = false;
      }
    );
    console.log("end request");
  }
}
