import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'app-influencer-account',
  templateUrl: './influencer-account.component.html',
  styleUrls: ['./influencer-account.component.css']
})
export class InfluencerAccountComponent implements OnInit {
  id:any ;
  constructor() { 
  //   this._Activatedroute.paramMap.subscribe(params => { 
  //     this.id = params.get('id'); 
  // });
  }

  ngOnInit(): void {
  }

}
