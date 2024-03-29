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
    console.log("my id"+user_id)
    return this.http.get(this.apiUrl+"/influencers/singleInfluencer/?user_id="+user_id)
  //return this.http.get(environment.url+"/interview/list")
  }

  updateProfileImage(data:any){

    return this.http.post(this.apiUrl+"/influencers/upload_profile_image",data);
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
  
  payment(data:any){
    
    return this.http.post(this.apiUrl+"/login/payment",data);
    //return this.http.post(this.apiUrl+"/test/account",data);
    //return this.http.post(this.apiUrl+"/test/craete-account",data);
  }
  addCard(data:any){
    
    return this.http.post(this.apiUrl+"/influencers/addCard",data);
  }

  myAccountInfo(){

    let user_data = localStorage.getItem('login_user_data');

    if(user_data){

      return JSON.parse(user_data);
      
    }
  }

  getNotifications(influencer_id:any){
    
    return this.http.get(this.apiUrl+"/influencers/getNotifications?influencer_id="+influencer_id);
  }
  getNotificationUnreadCount(influencer_id:any){
    
    return this.http.get(this.apiUrl+"/influencers/getNotificationUnreadCount?influencer_id="+influencer_id);
  }

  

}
