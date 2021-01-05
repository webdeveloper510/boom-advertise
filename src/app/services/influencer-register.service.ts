import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InfluencerRegisterService {
  apiUrl : string = "http://localhost:3000";
  constructor(private http : HttpClient) { }

  register(data:any){
    return this.http.post(this.apiUrl+"/influencers/register",data)
  }

}
