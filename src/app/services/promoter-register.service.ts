import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromoterRegisterService {
  apiUrl : string = "http://localhost:3000";
  constructor(private http : HttpClient) { }

  register(data:any){
    return this.http.post(this.apiUrl+"/promoters/register",data)
  }


}
