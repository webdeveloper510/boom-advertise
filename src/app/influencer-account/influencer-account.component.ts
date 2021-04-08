import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MyAccountService } from '../services/my-account.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { PromoterRegisterService } from '../services/promoter-register.service';
import { parse } from 'path';
@Component({
  selector: 'app-influencer-account',
  templateUrl: './influencer-account.component.html',
  styleUrls: ['./influencer-account.component.css']
})
export class InfluencerAccountComponent implements OnInit {
  id                    : any ;
  influencer_data       : any = {};
  request_quotes_model  : boolean = false;
  paymen_model          : boolean = false;
  tiktok_price_div      : boolean = true;
  facebook_price_div    : boolean = false;
  instagram_price_div   : boolean = false;
  twitter_price_div     : boolean = false;

  tiktok_post_price_check_box   : boolean = false;
  tiktok_story_price_check_box  : boolean = false;
  

  facebook_post_price_check_box     : boolean = false;
  facebook_friend_price_check_box   : boolean = false;
  facebook_comment_price_check_box  : boolean = false;
  facebook_like_price_check_box     : boolean = false;
  
  instagram_post_price_check_box     : boolean = false;
  instagram_story_price_check_box    : boolean = false;
  instagram_comment_price_check_box  : boolean = false;
  instagram_like_price_check_box     : boolean = false;  
  instagram_follow_price_check_box   : boolean = false;  

  twitter_tweet_price_check_box    : boolean = false;
  twitter_retweet_price_check_box  : boolean = false;
  twitter_comment_price_check_box  : boolean = false;
  twitter_like_price_check_box     : boolean = false;  
  twitter_follow_price_check_box   : boolean = false; 
  
  media_price : any = {
                        tiktok : { post_price : 0, story_price : 0},
                        instagram : { post_price : 0, story_price : 0},
                        facebook : { post_price : 0, story_price : 0},
                        twitter : { post_price : 0, story_price : 0},
                      };

  media_post : any =  [];

  constructor(
              private _Activatedroute : ActivatedRoute,
              private MyAccountService:MyAccountService,
              private LoginService:LoginService,
              private proregservice:PromoterRegisterService,
              private router : Router,
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
 });

  ngOnInit(): void {
    this.singleInfluencer();
  }

  checkOut(media_type : any , description : string){

    let total_amount = 0;
    let MEDIA_OPTION :any = [];

    
    if(media_type == 'tiktok'){

      

      if(this.tiktok_post_price_check_box == true || this.tiktok_story_price_check_box == true){

        if(!description.trim()){
          alert('Description can\'t be empty.');
          return ;
        }
        
        let post_price = this.tiktok_post_price_check_box ?  this.media_price[media_type].post_price : 0; 
        let story_price = this.tiktok_story_price_check_box ?  this.media_price[media_type].story_price : 0; 
        total_amount = parseInt(post_price) + parseInt(story_price);

        if(this.tiktok_post_price_check_box){
          MEDIA_OPTION.push('POST');
        }
        if(this.tiktok_story_price_check_box){
          MEDIA_OPTION.push('STORY');
        }


        let buy_media = {
            media_key     : 'tiktok',
            post_price    : this.tiktok_post_price_check_box,
            story_price   : this.tiktok_story_price_check_box,
            description   : description,
            total_amount  : total_amount,
            influencer_id : this.id,
            email         : this.influencer_data.profile_data?.email,
            media_option  : MEDIA_OPTION.toString(),
        }

        localStorage.setItem('buy_media' , JSON.stringify(buy_media));
        this.router.navigate(['/check-out']);

      }



    } else if(media_type == 'facebook'){


      if( this.facebook_post_price_check_box    == true || 
          this.facebook_friend_price_check_box  == true || 
          this.facebook_comment_price_check_box == true || 
          this.facebook_like_price_check_box    == true
        ){

          let post_price    = this.facebook_post_price_check_box ?  this.media_price[media_type].post_price : 0; 
          let friend_price  = this.facebook_friend_price_check_box ?  this.media_price[media_type].friend_price : 0;
          let comment_price = this.facebook_comment_price_check_box ?  this.media_price[media_type].comment_price : 0;
          let like_price    = this.facebook_like_price_check_box ?  this.media_price[media_type].like_price : 0;

          total_amount = parseInt(post_price) + parseInt(friend_price)+ parseInt(comment_price)+ parseInt(like_price);
          
          if(this.facebook_post_price_check_box){
            MEDIA_OPTION.push('POST');
          }

          if(this.facebook_friend_price_check_box){
            MEDIA_OPTION.push('FRIEND');
          }

          if(this.facebook_comment_price_check_box){
            MEDIA_OPTION.push('COMMENT');
          }

          if(this.facebook_like_price_check_box){
            MEDIA_OPTION.push('LIKE');
          }

          let buy_media = {
              media_key       : 'facebook',
              post_price      : this.facebook_post_price_check_box,
              friend_price    : this.facebook_friend_price_check_box,
              comment_price   : this.facebook_comment_price_check_box,
              like_price      : this.facebook_like_price_check_box,
              description     : description,
              total_amount    : total_amount,
              influencer_id   : this.id,
              email           : this.influencer_data.profile_data?.email,
              media_option    : MEDIA_OPTION.toString(),
          }
          
          localStorage.setItem('buy_media' , JSON.stringify(buy_media));
          this.router.navigate(['/check-out']);
        }
    } else if(media_type == 'instagram'){

      if( this.instagram_post_price_check_box     == true || 
        this.instagram_story_price_check_box      == true || 
        this.instagram_comment_price_check_box    == true || 
        this.instagram_like_price_check_box       == true ||
        this.instagram_follow_price_check_box     == true

      ){

        let post_price    = this.instagram_post_price_check_box ?  this.media_price[media_type].post_price : 0; 
        let story_price   = this.instagram_story_price_check_box ?  this.media_price[media_type].story_price : 0;
        let comment_price = this.instagram_comment_price_check_box ?  this.media_price[media_type].comment_price : 0;
        let like_price    = this.instagram_like_price_check_box ?  this.media_price[media_type].like_price : 0;
        let follow_price  = this.instagram_follow_price_check_box ?  this.media_price[media_type].follow_price : 0;

        total_amount = parseInt(post_price) + parseInt(story_price)+ parseInt(comment_price)+ parseInt(like_price)+parseInt(follow_price);

        if(this.instagram_post_price_check_box){
          MEDIA_OPTION.push('POST');
        }

        if(this.instagram_story_price_check_box){
          MEDIA_OPTION.push('STORY');
        }

        if(this.instagram_comment_price_check_box){
          MEDIA_OPTION.push('COMMENT');
        }
        
        if(this.instagram_like_price_check_box){
          MEDIA_OPTION.push('LIKE');
        }
        
        if(this.instagram_follow_price_check_box){
          MEDIA_OPTION.push('FOLLOW');
        }

        let buy_media = {
          media_key       : 'instagram',
          post_price      : this.instagram_post_price_check_box,
          story_price     : this.instagram_story_price_check_box,
          comment_price   : this.instagram_comment_price_check_box,
          like_price      : this.instagram_like_price_check_box,
          follow_price    : this.instagram_follow_price_check_box,
          description     : description,
          total_amount    : total_amount,
          influencer_id   : this.id,
          email           : this.influencer_data.profile_data?.email,
          media_option    : MEDIA_OPTION.toString(),
        }
      
        localStorage.setItem('buy_media' , JSON.stringify(buy_media));
        this.router.navigate(['/check-out']);
      }
    } else if(media_type == 'twitter'){

     
      if( this.twitter_tweet_price_check_box      == true || 
          this.twitter_retweet_price_check_box    == true || 
          this.twitter_comment_price_check_box    == true || 
          this.twitter_like_price_check_box       == true ||
          this.twitter_follow_price_check_box     == true

      ){ 

        let tweet_price   = this.twitter_tweet_price_check_box ?  this.media_price[media_type].tweet_price : 0; 
        let retweet_price = this.twitter_retweet_price_check_box ?  this.media_price[media_type].retweet_price : 0;
        let comment_price = this.twitter_comment_price_check_box ?  this.media_price[media_type].comment_price : 0;
        let like_price    = this.twitter_like_price_check_box ?  this.media_price[media_type].like_price : 0;
        let follow_price  = this.twitter_follow_price_check_box ?  this.media_price[media_type].follow_price : 0;

        total_amount = parseInt(tweet_price) + parseInt(retweet_price)+ parseInt(comment_price)+ parseInt(like_price)+parseInt(follow_price);


        if(this.twitter_tweet_price_check_box){
          MEDIA_OPTION.push('TWEET');
        }

        if(this.twitter_retweet_price_check_box){
          MEDIA_OPTION.push('RETWEET');
        }

        if(this.twitter_comment_price_check_box){
          MEDIA_OPTION.push('COMMENT');
        }
        
        if(this.twitter_like_price_check_box){
          MEDIA_OPTION.push('LIKE');
        }
        
        if(this.twitter_follow_price_check_box){
          MEDIA_OPTION.push('FOLLOW');
        }


        let buy_media = {
          media_key       : 'twitter',
          tweet_price     : this.twitter_tweet_price_check_box,
          retweet_price   : this.twitter_retweet_price_check_box,
          comment_price   : this.twitter_comment_price_check_box,
          like_price      : this.twitter_like_price_check_box,
          follow_price    : this.twitter_follow_price_check_box,
          description     : description,
          total_amount    : total_amount,
          influencer_id   : this.id,
          email           : this.influencer_data.profile_data?.email,
          media_option    : MEDIA_OPTION.toString(),
        }

        localStorage.setItem('buy_media' , JSON.stringify(buy_media));
        this.router.navigate(['/check-out']);
      }
    }

  }

  singleInfluencer(){
   
    this.MyAccountService.singleInfluencer(this.id).subscribe(
      (response:any) => {
        console.log(response);
        //console.log(JSON.stringify(response));
        
        if(response.statusCode == 200){

          this.influencer_data = response.mydata;
          this.media_price = response.mydata.price_data;
          this.media_post = response.mydata.posts;

        }
      }
    );
  }

  openRequestModel(post_id:any,influencerid:any){
    
    this.request_quotes_model = true;
    this.request_quotes.patchValue({   post_id  : post_id ,influencerid : influencerid }); // put values in form
  }

  sendRequestQuotes(){
    
    let data      = this.request_quotes.value
    data.user_id  = this.LoginService.user_id;
    data.email    = this.influencer_data.profile_data?.email;
    
    this.proregservice.sendRequestQuotes(data).subscribe(
      (response : any) => {

        console.log(response);
        
        if(response.statusCode == 100) {
          alert(response.message)
          this.request_quotes_model = false;
        }

        
      }
    );
    
  }
}
