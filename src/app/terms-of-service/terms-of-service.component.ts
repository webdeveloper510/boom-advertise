import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.css']
})
export class TermsOfServiceComponent implements OnInit {

  constructor() { }

  TITLE : string = 'TERMS AND CONDITIONS';
  
  ngOnInit(): void {
  }

}
