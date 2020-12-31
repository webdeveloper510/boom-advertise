import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl : string = `${environment.apiUrl}`;
  user_id : any ;
  is_logged_in : boolean  = false;
  local_storage_key : string = "login_user_data";
  constructor(private http : HttpClient) { 
    
    console.log();
    //this.loginCheck();
  }

  getRedirectUrl() {

    return this.http.get(this.apiUrl+`/sessions/connect`)
  }
  
  saveAccessToken(oauthToken: string, oauthVerifier: string) {
    return this.http.post(this.apiUrl+`/sessions/saveAccessTokens`,{oauth_token:oauthToken,oauth_verifier:oauthVerifier})
  }


  loginCheck() {

    if(typeof(localStorage.getItem(this.local_storage_key))!='undefined' && localStorage.getItem(this.local_storage_key) != null){
        let user_data:any = localStorage.getItem(this.local_storage_key);
        user_data         = JSON.parse(user_data);
        this.user_id      = user_data._id;
        this.is_logged_in = true;
        console.log("user alreday login");

    } else {
      this.user_id      = "";
      this.is_logged_in = false;

    }
  }
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Accept':  'application/json',
  //     'Content-Type':  'application/x-www-form-urlencoded',
  //   })
  // };

  login(data:any){
    return this.http.post(this.apiUrl+"/login",data)
  }

  logOut(){
    this.is_logged_in = false;
    this.user_id      = "";
    localStorage.removeItem(this.local_storage_key)

  }

}

