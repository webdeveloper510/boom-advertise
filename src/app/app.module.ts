import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PromoterSignUpComponent } from './promoter-sign-up/promoter-sign-up.component';

import { SigninComponent } from './signin/signin.component';

import { WorkersRegisterComponent } from './workers-register/workers-register.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { InfluencerAccountComponent } from './influencer-account/influencer-account.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PromoterAccountComponent } from './promoter-account/promoter-account.component';
import { FormcustomComponent } from './formcustom/formcustom.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PromoterSignUpComponent,
    SigninComponent,
    WorkersRegisterComponent,
    MyAccountComponent,
    InfluencerAccountComponent,
    PromoterAccountComponent,
    FormcustomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    TooltipModule,
    BsDropdownModule, 
    TabsModule,
    HttpClientModule,
    
    

  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
