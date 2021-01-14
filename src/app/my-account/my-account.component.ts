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

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
   
  });
  
  constructor(private MyAccountService:MyAccountService,private http : HttpClient,private router: Router,) { 
  }

  data:any = [];

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
