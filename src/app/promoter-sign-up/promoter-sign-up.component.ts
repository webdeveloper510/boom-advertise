import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-promoter-sign-up',
  templateUrl: './promoter-sign-up.component.html',
  styleUrls: ['./promoter-sign-up.component.css']
})
export class PromoterSignUpComponent implements OnInit {
  profileForm = new FormGroup({
  
    promoter_signup: new FormGroup({
      name_person: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm: new FormControl(''),
      checked: new FormControl('')
    })
  });


  onSubmit() {

    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
