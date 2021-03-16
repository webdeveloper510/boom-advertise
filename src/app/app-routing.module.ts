import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfluencerAccountComponent } from './influencer-account/influencer-account.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { PromoterAccountComponent } from './promoter-account/promoter-account.component';
import { TopAuthenticInfluencersRankingComponent } from './top-authentic-influencers-ranking/top-authentic-influencers-ranking.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ErrorComponent } from './error/error.component';
import { TestpayComponent } from './testpay/testpay.component';
import { TestpaycustomComponent } from './testpaycustom/testpaycustom.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AllInfluencersComponent } from './admin/all-influencers/all-influencers.component';
import { AllCustomersComponent } from './admin/all-customers/all-customers.component';

const routes: Routes = [
 { path: '', pathMatch: 'full' ,  component: HomeComponent},
 
    {
     path: 'home', component: HomeComponent
    },
    {
      path: 'influencer-account/:id', component: InfluencerAccountComponent
    },
    {
      path: 'promoter-account', component: PromoterAccountComponent
    },
    {
      path: 'my-account', component: MyAccountComponent
    },
    {
      path: 'influencers', component: TopAuthenticInfluencersRankingComponent
    },
    {
      path: 'check-out', component: CheckOutComponent
    },
    {
      path: 'test', component: TestpayComponent
    },
    {
      path: 'pay', component: TestpaycustomComponent
    },
    {
      path: 'admin', component: DashboardComponent
    },
    {
      path: 'all-influencers', component: AllInfluencersComponent
    },
    {
      path: 'all-customers', component: AllCustomersComponent
    },
    { path: '**' ,  component: ErrorComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
