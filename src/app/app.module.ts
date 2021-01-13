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
import { TopAuthenticInfluencersRankingComponent } from './top-authentic-influencers-ranking/top-authentic-influencers-ranking.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, SocialAuthServiceConfig} from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
//import { MatButtonModule} from '@angular/material/button';
//import {DataTablesModule} from 'angular-datatables';
// import {
  
//   MatTableModule,
//   MAT_DIALOG_DEFAULT_OPTIONS,
// } from '@angular/material';


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
    FormcustomComponent,
    TopAuthenticInfluencersRankingComponent,
    PrivacyComponent,
    PrivacyComponent
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
    BrowserAnimationsModule,
    SocialLoginModule
   // DataTablesModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('203844031476846')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent] 

})












export class AppModule { }
