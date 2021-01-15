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

  login_form : boolean  = true;
  login_form1 : boolean  = false;
  filename:string="";
  image_value :any = "";
  data:any = [];
  media_post : any =  {
    
    "tikrok" :[
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Tik Tok human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Tik Tok human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Tik Tok human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
              ],
    "instgram" :[
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Instagram human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Instagram human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Instagram human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
              ],
    "facebook" :[
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Facebook human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Facebook human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Facebook human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
              ],
    "twitter" :[
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Twitter human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Twitter human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"},
                {image :"/assets/images/Group 45.png",text_name:"@lorengray",discription:"Twitter human machine recognition page",likes_count:"50.8K",comments_count:"20.8K"}
              ],
  };

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
   
  });
  
  constructor(
                private MyAccountService:MyAccountService,
                private http : HttpClient,
                private router: Router,
                ) { 
  }

  

  ngOnInit(): void {
    this.singleInfluencer()
  }
  

  singleInfluencer(){
     this.MyAccountService.singleInfluencer().subscribe(
          (response:any) =>{
          console.log(response)
        this.data = response['data'];
        })
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
  }

}
