import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  apiUrl : string = `${environment.apiUrl}`;

  constructor(private http : HttpClient) { }

  singleInfluencer(){
    return this.http.get(this.apiUrl+"/influencers/singleInfluencer")
  //return this.http.get(environment.url+"/interview/list")
  }

  uploadProfileImage(data:any){

    return this.http.post(this.apiUrl+"/influencers/singleInfluencer",data);
  }
  
  uploadProfile(data:any){

    return this.http.post(this.apiUrl+"/influencers/singleInfluencer",data);
  }
  
  updatePrice(data:any){

    return this.http.post(this.apiUrl+"/influencers/singleInfluencer",data);
  }

  myAccountInfo(){

    let user_data = localStorage.getItem('login_user_data');

    if(user_data){

      return JSON.parse(user_data);
      
    }
  }

}
