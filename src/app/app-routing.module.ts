import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfluencerAccountComponent } from './influencer-account/influencer-account.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { PromoterAccountComponent } from './promoter-account/promoter-account.component';
import { TopAuthenticInfluencersRankingComponent } from './top-authentic-influencers-ranking/top-authentic-influencers-ranking.component';

const routes: Routes = [
 { path: '', pathMatch: 'full' ,  component: HomeComponent},
  {
     path: 'home', component: HomeComponent
    },
  {
     path: 'influencer-account', component: InfluencerAccountComponent
},
{
  path: 'promoter-account', component: PromoterAccountComponent
},
{
  path: 'my-account', component: MyAccountComponent
},
{
  path: 'influencers', component: TopAuthenticInfluencersRankingComponent
}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
