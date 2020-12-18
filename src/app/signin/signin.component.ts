import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  influencer = new FormGroup({
    influencer_signup: new FormGroup({
       name_person: new FormControl(''),
       email: new FormControl(''),
       password: new FormControl(''),
       confirm: new FormControl(''),
       checked: new FormControl(''),
       tiktok: new FormControl(''),
       insta: new FormControl(''),
       fb: new FormControl(''),
       twitter: new FormControl('')
     })
   });
  constructor() { }
  onSubmit() {

    // TODO: Use EventEmitter with form value
    console.warn(this.influencer.value);
  }
  ngOnInit(): void {
  }

}
