import { Component, OnInit } from '@angular/core';
import { MyAccountService } from '../services/my-account.service';
import { LoginService } from '../services/login.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-influencer-notifications',
  templateUrl: './influencer-notifications.component.html',
  styleUrls: ['./influencer-notifications.component.css']
})
export class InfluencerNotificationsComponent implements OnInit {

  constructor(private myAccountService : MyAccountService , private loginService : LoginService) {

    this.getNotifications();

   }

  TITLE : string = 'all notifications';
  ALL_NOTIFICATIONS : any = [];
  DATATABLE_INITIALIZE : boolean = false;
 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu :  [ [5,10, 25, 50, -1], [5,10, 25, 50, "All"] ],
      pageLength: 5,
      processing: true,
      //order : [0, 'desc']
    };

   
  }

  getNotifications(){
    
    this.myAccountService.getNotifications(this.loginService.user_id).subscribe(
      (response : any) => {

        console.log(response);

        if(response.statusCode == 100){

          this.ALL_NOTIFICATIONS = response.data;
        } else if(response.statusCode == 200) {
          
          alert(response.data);
        } else {
          alert("server problem. Please try again later.")
        }
        this.dtTrigger.next();
      }
    );
  }

}
