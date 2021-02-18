import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})

export class CheckOutComponent implements OnInit {

  paypal_image  : string = "/assets/images/Paypal-icon.png";
  credit_card   : string = "/assets/images/credit-card.png";
  constructor() { }

  ngOnInit(): void {
  }
 
}
