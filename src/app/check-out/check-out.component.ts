import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})

export class CheckOutComponent implements OnInit {

  paypal_image  : string = "/assets/images/Paypal-icon.png";
  credit_card   : string = "/assets/images/credit-card.jpg";
  constructor() { }

  ngOnInit(): void {
  }
 
}
