import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl : string = `${environment.apiUrl}`;

  constructor(private http : HttpClient,) { }

  getInfluencers(){
    return this.http.get(this.apiUrl+`/influencers/influencers`);
  }
  deleteInfluencers(data :any){
    return this.http.post(this.apiUrl+`/influencers/deleteInfluencers`,data);
  }
}
