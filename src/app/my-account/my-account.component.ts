import { Component, OnInit } from '@angular/core';
import { MyAccountService } from '../services/my-account.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { chown } from 'fs';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})

export class MyAccountComponent implements OnInit {

  user_data : any ;
  login_form : boolean  = true;
  login_form1 : boolean = false;
  filename:string       = "";
  image_value :any      = "";
  data:any              = [];
  post_edit_model:boolean     = false;
  profile_edit_model:boolean  = false;
  price_edit_model:boolean    = false;
  media_price : any = {
                        tiktok : { post_price : 200, story_price : 300},
                        instagram : { post_price : 400, story_price : 500},
                        facebook : { post_price : 600, story_price : 700},
                        twitter : { post_price : 100, story_price : 200},
                      };

  media_post : any =  {
    
                        tiktok :[
                                    {id:1,image :"/assets/images/Group 45.png",text_name:"@lorengray tiktok1",description:"Tik Tok human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                                    {id:2,image :"/assets/images/Group 46.png",text_name:"@lorengray tiktok2",description:"Tik Tok human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                                    {id:3,image :"/assets/images/Group 45.png",text_name:"@lorengray tiktok3",description:"Tik Tok human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
                                  ],
                        instagram :[
                                    {id:4,image :"/assets/images/Group 45.png",text_name:"@lorengray instagram1",description:"Instagram human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                                    {id:5,image :"/assets/images/Group 45.png",text_name:"@lorengray instagram2",description:"Instagram human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                                    {id:6,image :"/assets/images/Group 46.png",text_name:"@lorengray instagram3",description:"Instagram human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
                                  ],
                        facebook :[
                                    {id:7,image :"/assets/images/Group 46.png",text_name:"@lorengray facebook1",description:"Facebook human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                                    {id:8,image :"/assets/images/Group 45.png",text_name:"@lorengray facebook2",description:"Facebook human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                                    {id:9,image :"/assets/images/Group 45.png",text_name:"@lorengray facebook3",description:"Facebook human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
                                  ],
                        twitter :[
                                    {id:10,image :"/assets/images/Group 46.png",text_name:"@lorengray twitter1",description:"Twitter human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                                    {id:11,image :"/assets/images/Group 46.png",text_name:"@lorengray twitter2",description:"Twitter human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                                    {id:12,image :"/assets/images/Group 45.png",text_name:"@lorengray twitter3",description:"Twitter human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
                                  ],
                      };

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
   
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
  
  constructor(
                private MyAccountService:MyAccountService,
                private http : HttpClient,
                private router: Router,
                ) { 
  }

  

  ngOnInit(): void {

    this.user_data = this.MyAccountService.myAccountInfo();
    this.singleInfluencer()
  }
  

  singleInfluencer(){
    this.MyAccountService.singleInfluencer()
      .subscribe(
        (response:any) =>{
          console.log(response)
          this.data = response['data'];
        }
      )
   }

   updateProfile(){

    console.log(this.profile_edit.value);
    let user_data = this.MyAccountService.myAccountInfo();
    console.log(user_data);
    console.log("end");
   }

  openPostModel(media_type:string , index_value:number,id:number){

    this.post_edit_model = true;

    this.post_edit.patchValue({
                                text_name   : this.media_post[media_type][index_value].text_name,
                                description : this.media_post[media_type][index_value].description,
                                media_type  : media_type,
                                id          : id,
                                index_value : index_value,
                              });
  }

  openPriceModel(type:string){

    this.price_edit_model = true;

    this.price_edit.patchValue({

      post_price  : this.media_price[type].post_price,
      story_price : this.media_price[type].story_price,
      media_type  : type,
    });
  }

  updatePrice(){

    console.log(this.price_edit.value);
    return false;
    let data = this.price_edit.value;

    this.MyAccountService.updatePrice(data).subscribe(
      (response:any) => {
        console.log(response);
        
      }
    );
  }

  updatePost(){

    let data  = this.post_edit.value;
    
    return false;
    this.MyAccountService.uploadProfile(data).subscribe(
      (response:any) => {

        console.log(response);
        let type  = this.post_edit.value.media_type;
        let index = this.post_edit.value.index_value;
        this.media_post[type][index].text_name    = this.post_edit.value.text_name;
        this.media_post[type][index].description  = this.post_edit.value.description;
        this.post_edit_model = false;
      }
    );
  }

  // get f(){
  //   return this.myForm.controls;
  // }

  submit(){
    
    console.log(this.myForm.value);
    
    if(this.image_value){

      const formData = new FormData();
      formData.append('uploadedImage', this.image_value);
      formData.append('user_id', '1');
      this.MyAccountService.uploadProfileImage(formData).subscribe(
        (response:any) =>{
          console.log(response)
          this.image_value = "";
        }
      );
    }

  }

  selectFile(event:any){

    if(event.target.files[0]){
      this.image_value = event.target.files[0];;
    }else {
      this.image_value = "";
    }
    
    this.filename=this.myForm.value.file;
    console.log(this.media_post);
    console.log("this.media_post");
  }

}
