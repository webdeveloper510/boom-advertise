import { Component, OnInit } from '@angular/core';
import { MyAccountService } from '../services/my-account.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { chown } from 'fs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})

export class MyAccountComponent implements OnInit {

  login_form  : boolean    = true;
  login_form1 : boolean   = false;
  filename    : string         = "";
  image_value : any        = "";
  data        : any        = {};
  new_notification : any   = "";

  post_edit_model     : boolean  = false;
  profile_edit_model  : boolean  = false;
  price_edit_model    : boolean  = false;

  facebook_price_edit_model : boolean = false;
  instagram_price_edit_model: boolean = false;
  tiktok_price_edit_model   : boolean = false;
  twitter_price_edit_model  : boolean = false;

  type_of_media   : any = ['tiktok','instagram', 'facebook' , 'twitter'];
  type_of_post    : any = ['post','story'];
  type_of_upload  : any = ['image','video'];
  allowed_type    : any = 'image/*';

  influencer_url    : string = location.origin;
  copy_button_text  : string = "Copy Link";
  copy_button_class : string = "btn-info";

  media_price : any = {
                        tiktok : { post_price : 0, story_price : 0},
                        instagram : { post_price : 0, story_price : 0 ,comment_price :0 , like_price : 0 , follow_price : 0},
                        facebook : { post_price : 0, friend_price : 0 , comment_price : 0 ,like_price : 0},
                        twitter : { tweet_price : 0, retweet_price : 0 , comment_price : 0 , like_price : 0 ,follow_price : 0},
                      };

  media_post : any = [];
  // media_post : any =  {
    
  //                       tiktok :[
  //                                   {id:1,image :"http://localhost:8082/uploadedImage-1611207278017.jpg",text_name:"@lorengray tiktok1",description:"Tik Tok human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
  //                                   {id:2,image :"/assets/images/Group 46.png",text_name:"@lorengray tiktok2",description:"Tik Tok human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
  //                                   {id:3,image :"/assets/images/Group 45.png",text_name:"@lorengray tiktok3",description:"Tik Tok human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
  //                                 ],
  //                       instagram :[
  //                                   {id:4,image :"/assets/images/Group 45.png",text_name:"@lorengray instagram1",description:"Instagram human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
  //                                   {id:5,image :"/assets/images/Group 45.png",text_name:"@lorengray instagram2",description:"Instagram human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
  //                                   {id:6,image :"/assets/images/Group 46.png",text_name:"@lorengray instagram3",description:"Instagram human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
  //                                 ],
  //                       facebook :[
  //                                   {id:7,image :"/assets/images/Group 46.png",text_name:"@lorengray facebook1",description:"Facebook human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
  //                                   {id:8,image :"/assets/images/Group 45.png",text_name:"@lorengray facebook2",description:"Facebook human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
  //                                   {id:9,image :"/assets/images/Group 45.png",text_name:"@lorengray facebook3",description:"Facebook human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
  //                                 ],
  //                       twitter :[
  //                                   {id:10,image :"/assets/images/Group 46.png",text_name:"@lorengray twitter1",description:"Twitter human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
  //                                   {id:11,image :"/assets/images/Group 46.png",text_name:"@lorengray twitter2",description:"Twitter human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
  //                                   {id:12,image :"/assets/images/Group 45.png",text_name:"@lorengray twitter3",description:"Twitter human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
  //                                 ],
                     // };

  constructor(
              private MyAccountService:MyAccountService,
              private loginService : LoginService,
              private http : HttpClient,
              private router: Router,
              ) {  
              
                this.influencer_url = this.influencer_url+"/influencer-account/"+this.loginService.user_id;
  }
        
  copyToClipboard(){

    this.copy_button_text = "Copied";
    this.copy_button_class = "btn-success";
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "1";
    selBox.value = this.influencer_url;
   
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);

    setTimeout(() => {

      this.copy_button_class  = "btn-info";
      this.copy_button_text  = "Copy Link";
    },1000);

  }
        
  ngOnInit(): void {

    this.singleInfluencer();
    this.getNotificationUnreadCount();
  }

  myForm = new FormGroup({
    
    media_name  : new FormControl(""),
    type_post   : new FormControl(""),
    file              : new FormControl('', [Validators.required]),
    post_price        : new FormControl(""),
    post_description  : new FormControl(""),
    upload_type       : new FormControl(this.type_of_upload[0]),
  });

  profile_edit = new FormGroup({
    email  : new FormControl(''),
    name : new FormControl(''),
 });

  post_edit = new FormGroup({ 
      text_name   : new FormControl(''),
      description : new FormControl(''),
      id          : new FormControl(''),
      index_value : new FormControl(''),
      media_type  : new FormControl(''),
    
   });
   
  price_edit = new FormGroup({
      post_price  : new FormControl(''),
      story_price : new FormControl(''),
      media_type  : new FormControl(''),
   });

  tiktok_price_edit = new FormGroup({
    post_price  : new FormControl(''),
    story_price : new FormControl(''),
    media_type  : new FormControl(''),
  });
  
  
    facebook_price_edit = new FormGroup({

      post_price  : new FormControl(''),
      friend_price : new FormControl(''),
      comment_price : new FormControl(''),
      like_price : new FormControl(''),
      media_type  : new FormControl(''),
    });
    
    instagram_price_edit = new FormGroup({

      post_price    : new FormControl(''),
      story_price   : new FormControl(''),
      comment_price : new FormControl(''),
      like_price    : new FormControl(''),
      follow_price  : new FormControl(''),
      media_type    : new FormControl(''),
    });
    
    twitter_price_edit = new FormGroup({

      tweet_price    : new FormControl(''),
      retweet_price   : new FormControl(''),
      comment_price : new FormControl(''),
      like_price    : new FormControl(''),
      follow_price  : new FormControl(''),
      media_type    : new FormControl(''),
    });

     

  initProfileEdit(){

    this.profile_edit.patchValue({
      name : this.data.name,
      email : this.data.email,
    });
  }
  
  getNotificationUnreadCount(){
    this.MyAccountService.getNotificationUnreadCount(this.loginService.user_id)
      .subscribe(
        (response:any) =>{

          console.log("response");
          console.log(response);

          if(response.statusCode == 100){

            this.new_notification = response.data.length
          } else {
            
            this.new_notification = 0;
          }
        }
      );
  }

  singleInfluencer(){
    
    
    this.MyAccountService.singleInfluencer(this.loginService.user_id)
      .subscribe(
        (response:any) =>{
          console.log(response); 
               
          this.data           = response['data'];
          
          this.media_price    = response.mydata.price_data;
          this.data           = response.mydata.profile_data;
          this.media_post     = response.mydata.posts;
          this.data.followers = response.mydata.followers;
          this.initProfileEdit();
         
        }
      )
   }
 
   updateProfile(){

    //let user_data = this.MyAccountService.myAccountInfo();
    let data      = this.profile_edit.value;
    data.user_id  = this.loginService.user_id;

    this.MyAccountService.updateProfile(data).subscribe(
      (response : any) => {

        //console.log(response);
        if(response.statusCode == 200){
          this.profile_edit_model = false;
          this.singleInfluencer();
        }else{ }
      }
    );
   }

 

  openPriceModel(type:string){


    if(type == 'facebook') {

      this.facebook_price_edit_model = true;
      this.facebook_price_edit.patchValue({

        post_price    : this.media_price[type].post_price,
        friend_price  : this.media_price[type].friend_price,
        comment_price : this.media_price[type].comment_price,
        like_price    : this.media_price[type].like_price,
        media_type    : type,
      });
    } else if(type == 'instagram') {

      this.instagram_price_edit_model = true;
      this.instagram_price_edit.patchValue({

        post_price    : this.media_price[type].post_price,
        story_price   : this.media_price[type].story_price,
        comment_price : this.media_price[type].comment_price,
        like_price    : this.media_price[type].like_price,
        follow_price  : this.media_price[type].follow_price,
        media_type    : type,
      });
    } else if(type == 'twitter') {

      this.twitter_price_edit_model = true;
      
      this.twitter_price_edit.patchValue({

        tweet_price   : this.media_price[type].tweet_price,
        retweet_price : this.media_price[type].retweet_price,
        comment_price : this.media_price[type].comment_price,
        like_price    : this.media_price[type].like_price,
        follow_price  : this.media_price[type].follow_price,
        media_type    : type,
      });
    } else {

      this.tiktok_price_edit_model = true;

      this.tiktok_price_edit.patchValue({

          post_price  : this.media_price[type].post_price,
          story_price : this.media_price[type].story_price,
          media_type  : type,
        });
    }

    // this.price_edit_model = true;

    // this.price_edit.patchValue({

    //   post_price  : this.media_price[type].post_price,
    //   story_price : this.media_price[type].story_price,
    //   media_type  : type,
    // });
  }

  updatePrice(media_type:any){

    let data ;
    if(media_type == 'facebook'){

      data   = this.facebook_price_edit.value;
    } else if(media_type == 'instagram') {

      data   = this.instagram_price_edit.value;
    } else if(media_type == 'twitter') {

      data   = this.twitter_price_edit.value;
      
    } else {
      data   = this.tiktok_price_edit.value;
    }
    
    data.user_id  = this.loginService.user_id;
    
    this.MyAccountService.updatePrice(data).subscribe(
      (response:any) => {
        
        //console.log(response);

        if(response.statusCode == 200){

          if(media_type == 'facebook'){

            this.facebook_price_edit_model = false;
          } else if(media_type == 'instagram') {
      
            this.instagram_price_edit_model = false;
          } else if(media_type == 'twitter') {
      
            this.twitter_price_edit_model = false;
          } else {
            this.tiktok_price_edit_model = false;
          }

          this.price_edit_model = false;
          this.singleInfluencer();
        }else{}
      }
    );
  }

  deletePost(post_id:any){

    this.MyAccountService.deletePost(post_id).subscribe(
      (response:any) => {
        //console.log(response);
        this.singleInfluencer();
      }
    );
    
  }


  uploadPost(){
    
    
    
    if(this.image_value && this.myForm.value.post_price && this.myForm.value.post_description){

      console.log('hh');
      
      const formData = new FormData();
      // formData.append('media_type', this.myForm.value.media_name);
      // formData.append('post_type', this.myForm.value.type_post);
      formData.append('uploadedImage', this.image_value);
      formData.append('user_id', this.loginService.user_id);
      formData.append('price', this.myForm.value.post_price);
      formData.append('description', this.myForm.value.post_description);
      formData.append('upload_type', this.myForm.value.upload_type);
      
      this.MyAccountService.uploadPost(formData).subscribe(
        (response:any) =>{
          console.log(response);
          
          this.singleInfluencer();
          this.myForm.reset();
          this.myForm.patchValue({upload_type : this.type_of_upload[0]});
          this.myForm.patchValue({post_price : ""});
          this.filename = "";
          this.image_value = "";
        }
      );
    }

  }

  selectFile(event:any){

    this.image_value = event.target.files[0] ? event.target.files[0] : "";
    this.filename=this.myForm.value.file;
  }

  updateProfileImage(event:any) {

    if(event.target.files[0]){
      let image_data = event.target.files[0];
      
      const formData = new FormData();
      formData.append('profileImage', image_data);
      formData.append('user_id', this.loginService.user_id);

      this.MyAccountService.updateProfileImage(formData).subscribe(
        (response : any) => {
          //console.log(response);
          if(response.statusCode == 200){

            this.singleInfluencer();
          } else {

          }
        }
      );
    }
  }

}
