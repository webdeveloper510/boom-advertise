import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promoter-account',
  templateUrl: './promoter-account.component.html',
  styleUrls: ['./promoter-account.component.css']
})
export class PromoterAccountComponent implements OnInit {

  constructor() {



   }
 
  public data = [
    {Srno:'1', Username: 'Danny', mail:'@dany', template : '/assets/images/loren-gray-x-things-you-never-knew-about-the-tiktok-star-1586962638-view-0.png', Date: '29-Dec-2020',Your_Payment:'$250 for 1 item',Status:'Processing'},
    {Srno:'2', Username: 'therichpost', mail:'@cristiano',  template : '/assets/images/loren-gray-x-things-you-never-knew-about-the-tiktok-star-1586962638-view-0.png', Date: '30-Dec-2020',Your_Payment:'$250 for 1 item',Status:'Processing'},
    {Srno:'3', Username: 'Marcus',  mail:'@marcus',  template : '/assets/images/loren-gray-x-things-you-never-knew-about-the-tiktok-star-1586962638-view-0.png', Date: '24-Dec-2020',Your_Payment:'$250 for 1 item',Status:'Processing'},
    {Srno:'4', Username: 'therichpost', mail:'@cristiano',  template : '/assets/images/loren-gray-x-things-you-never-knew-about-the-tiktok-star-1586962638-view-0.png', Date: '21-Dec-2020',Your_Payment:'$250 for 1 item',Status:'Processing'},

];



  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
     
    };

}

}