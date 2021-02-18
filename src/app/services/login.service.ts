import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

//declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl : string = `${environment.apiUrl}`;
  user_id : any ;
  is_logged_in : boolean  = false;
  local_storage_key : string = "login_user_data";
  local_storage_login_userid_key : string = "login_userid";
  local_storage_logindata_key : string = "logindata";
  local_storage_local_midia_check_key : string = "local_midia_check";
  constructor(private http : HttpClient) { 
  }

  getRedirectUrl() {

    return this.http.get(this.apiUrl+`/sessions/connect`)
  }
  
  saveAccessToken(oauthToken: string, oauthVerifier: string) {
    let user_data:any = localStorage.getItem(this.local_storage_login_userid_key);
    return this.http.post(this.apiUrl+`/sessions/saveAccessTokens`,{oauth_token:oauthToken,oauth_verifier:oauthVerifier,_id:user_data})
  }


  loginCheck() {

    if(typeof(localStorage.getItem(this.local_storage_key))!='undefined' && localStorage.getItem(this.local_storage_key) != null){
        let user_data:any = localStorage.getItem(this.local_storage_key);
        user_data         = JSON.parse(user_data);
        this.user_id      = user_data._id;
        this.is_logged_in = true;
        
    } else {
     
      this.user_id      = "";
      this.is_logged_in = false;

    }
  }

  login(data:any){
    return this.http.post(this.apiUrl+"/login",data)
  }

  logOut(){
    this.is_logged_in = false;
    this.user_id      = "";
    localStorage.clear();
  }

}

