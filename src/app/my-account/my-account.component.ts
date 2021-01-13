import { Component, OnInit } from '@angular/core';
import { MyAccountService } from '../services/my-account.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

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

}
