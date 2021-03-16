import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Subject } from 'rxjs';
import { Console } from 'console';

@Component({
  selector: 'app-all-influencers',
  templateUrl: './all-influencers.component.html',
  styleUrls: ['./all-influencers.component.css']
})
export class AllInfluencersComponent implements OnInit {

  
  all_influencers : any     = [];
  delete_success  : string  = '';
  delete_error    : string  = '';
  datatable_initialize : boolean = false;
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private admin_service : AdminService,) { 

    this.getInfluencers();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu :  [ [5,10, 25, 50, -1], [5,10, 25, 50, "All"] ],
      pageLength: 5,
      processing: true,
      order : [0, 'desc']
    };
  }

  getInfluencers(){
    this.admin_service.getInfluencers().subscribe(
      (res : any) => {
        //console.log(JSON.stringify(res))
        if(res.statusCode == 200) {

          this.all_influencers = res.data;

          if(!this.datatable_initialize){

            this.dtTrigger.next();
          }
        }
      },
      (error : any) => {
        console.log(error);
      }
    );
  }

  deleteInfluencer(influencer_id : any , index : number){

    let data = {influencer_id : influencer_id};

    if(confirm("Are you sure, you want to delete all information of  this Influencer ?  ")){
      
      this.admin_service.deleteInfluencers(data).subscribe(
        (res : any) => {
          console.log(res);

          if(res.statusCode == 200){
            
            console.log(index);
            //this.getInfluencers();
            // this.all_influencers = this.all_influencers.splice(index, 1);
            this.delete_success = res.data;

            setTimeout(() => { this.delete_success = '' },2000);
          } else {
            this.delete_success = res.data;
            setTimeout(() => { this.delete_error = '' },2000);
           
          }
        },
        (error : any) => {

          console.log(error);
        }
      );
    } 
  }

}
