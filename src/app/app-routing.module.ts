import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfluencerAccountComponent } from './influencer-account/influencer-account.component';

const routes: Routes = [
 { path: '', pathMatch: 'full' ,  component: HomeComponent},
  {
     path: 'home', component: HomeComponent
    },
  {
     path: 'influencer-account', component: InfluencerAccountComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
