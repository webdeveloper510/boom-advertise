import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-top-authentic-influencers-ranking',
  templateUrl: './top-authentic-influencers-ranking.component.html',
  styleUrls: ['./top-authentic-influencers-ranking.component.css']
})
export class TopAuthenticInfluencersRankingComponent implements OnInit {
  public socialmedia: string="";
  constructor() { }

  public data = [
    {Srno:'1', Username: 'therichpost', Followers: '0.2B', EngagementRate:'2.44%',AuthenticEngagement:'1.1m',socialmedia:'Fb'},
    {Srno:'1', Username: 'therichpost', Followers: '0.2B', EngagementRate:'2.44%',AuthenticEngagement:'1.1m',socialmedia:'Insta'},
    {Srno:'1', Username: 'therichpost', Followers: '0.2B', EngagementRate:'2.44%',AuthenticEngagement:'1.1m',socialmedia:'Twitter'},
    {Srno:'1', Username: 'therichpost', Followers: '0.2B', EngagementRate:'2.44%',AuthenticEngagement:'1.1m',socialmedia:'Tik-Tok'},
];
  title1 = 'angulardatatables  multiple filter';
  positionList: string[] = ['Fb', 'Insta', 'Twitter','Tik-Tok'];
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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
     
    };
   
    }
    filter(){
      console.log(this.filterForm.value);

      let i = 0;

      for(i =0; i < this.data.length; i++){

        console.log(this.data[i].socialmedia);
      }
      console.log(this.data);
    } 
          
  
}
