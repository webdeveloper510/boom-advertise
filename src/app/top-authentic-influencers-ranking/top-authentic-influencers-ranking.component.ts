import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { InfluencersRankingService } from '../services/influencers-ranking.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-authentic-influencers-ranking',
  templateUrl: './top-authentic-influencers-ranking.component.html',
  styleUrls: ['./top-authentic-influencers-ranking.component.css']
})
export class TopAuthenticInfluencersRankingComponent implements OnInit {

  public socialmedia: string="";
  public tiktok: string="";

  constructor(
    private InfluencersRankingService:InfluencersRankingService,
    private http : HttpClient,
    private router: Router,
    ) { 

    }

  data:any = [];
  title1 = 'angulardatatables  multiple filter';
  positionList: string[] = ['facebook', 'instagram', 'twitter','tiktok'];
  filterForm = new FormGroup({
    position: new FormControl(),
  });
  filterValues = {
    position: [],
    name: '', 
    email: '',
    status: ''
}
  get position() { return this.filterForm.get('position'); }
  
  dtOptions: DataTables.Settings = {};
  
  ngOnInit() {
    this.influencers()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
     
    };
    }


    influencers(){
     // this.data1()
      this.InfluencersRankingService.getdata().subscribe(
           (response:any) =>{
           
        console.log(response);
        console.log(JSON.stringify(response));
        this.data = response['data'];
        
         }),
         (err : any) => {

          console.log("error occuring on backedn side");
         }
    }

    filter(){
      console.log(this.filterForm.value);
      let i = 0;
      for(i =0; i < this.data.length; i++){
        console.log(this.data[i]);
      }
    } 

}
