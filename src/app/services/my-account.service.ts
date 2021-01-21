import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  apiUrl : string = `${environment.apiUrl}`;

  constructor(private http : HttpClient) { }

  singleInfluencer(user_id : any){
    return this.http.get(this.apiUrl+"/influencers/singleInfluencer/?user_id="+user_id)
  //return this.http.get(environment.url+"/interview/list")
  }

  uploadPost(data:any){

    return this.http.post(this.apiUrl+"/influencers/upload_post",data);
  }

  deletePost(post_id:any){
    return this.http.get(this.apiUrl+"/influencers/delete_post/?post_id="+post_id)
  }
  
  updateProfile(data:any){

    return this.http.post(this.apiUrl+"/influencers/update_profile",data);
  }
  
  updatePrice(data:any){

    return this.http.post(this.apiUrl+"/influencers/update_price",data);
  }

  myAccountInfo(){

    let user_data = localStorage.getItem('login_user_data');

    if(user_data){

      return JSON.parse(user_data);
      
    }
  }

}
