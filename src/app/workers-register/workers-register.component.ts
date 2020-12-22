import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {HttpClient} from '@angular/common/http';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { WorkerRegisterService } from '../services/worker-register.service';
@Component({
  selector: 'app-workers-register',
  templateUrl: './workers-register.component.html',
  styleUrls: ['./workers-register.component.css']
})
export class WorkersRegisterComponent implements OnInit {
  worker_register = new FormGroup({
    worker_register: new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      coupon: new FormControl(''),
      checked: new FormControl('')
     })
   });
   constructor(private workerregister:WorkerRegisterService,private http : HttpClient) { }
   onApply() {
    console.log();
   }
   onSubmit() {
    // TODO: Use EventEmitter with form value
      // this.http.post(this.loginservice.apiUrl,data)
    console.log(this.worker_register.value);
    const data = this.worker_register.value
    .subscribe(
      (response) => {                           
        console.log(response)
  
      },
      (error) => {                            
        console.error(error)
      }
    );
  }
  ngOnInit(): void {
  }

}
