import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl : string = "http://localhost:3000";
  user_id : any ;
  is_logged_in : boolean  = false;
  constructor(private http : HttpClient) { }

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Accept':  'application/json',
  //     'Content-Type':  'application/x-www-form-urlencoded',
  //   })
  // };

  login(data:any){
    return this.http.post(this.apiUrl+"/login",data)
  }

}

