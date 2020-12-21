import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl : string = "http://localhost:3000";
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

