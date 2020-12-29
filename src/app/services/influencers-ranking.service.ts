import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfluencersRankingService {
  // getdata() {
  //   throw new Error('Method not implemented.');
  // }
  // InfluencersRankingService(data: { Srno: string; Username: string; mail: string; template: string; Followers: string; socialmedia: string; }) {
  //   throw new Error('Method not implemented.');
  // }
  apiUrl : string = "http://localhost:3000";

  constructor(private http : HttpClient) { }

  getdata(){
    return this.http.get(this.apiUrl+"/influencers/getInfluencers")
  //return this.http.get(environment.url+"/interview/list")
    }

    
  }


