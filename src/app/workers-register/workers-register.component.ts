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
  worker_signup = new FormGroup({
    worker_signup: new FormGroup({
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
    console.log(this.worker_signup.value);
    const data = this.worker_signup.value
    this.workerregister.register(data)
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
