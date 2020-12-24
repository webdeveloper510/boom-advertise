import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-formcustom',
  templateUrl: './formcustom.component.html',
  styleUrls: ['./formcustom.component.css']
})
export class FormcustomComponent implements OnInit {
  login_form : boolean  = true;
  login_form1 : boolean  = false;
  filename:string="";
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
   
  });

  get f(){
    return this.myForm.controls;
  }
     

  constructor() { }
  submit(){
    console.log(this.myForm.value);
    this.login_form = false;
    this.login_form1 = true;

  }
  ngOnInit(): void {
  }

working(){
  this.filename=this.myForm.value.file;
}
}
