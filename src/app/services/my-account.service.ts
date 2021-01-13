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

}
