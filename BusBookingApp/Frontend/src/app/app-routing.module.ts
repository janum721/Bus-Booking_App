import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth.guard';
import { BusDetailsComponent } from './booking/bus-details/bus-details.component';
import { BookingComponent } from './booking/booking.component';
import { SeatsComponent } from './booking/seats/seats.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { ConfirmationComponent } from './booking/confirmation/confirmation.component';

const routes: Routes = [ 
{
  path:'home', component: UserComponent
},
{
  path:'booking', component: BookingComponent,canActivate:[AuthGuard]
},
// {
//   path:'bus-details', component: BusDetailsComponent
// },
// {
//   path:'seats-booking', component: SeatsComponent
// },
// {
//   path:'payment', component: PaymentComponent
// },
// {
//   path:'ticket-confirmation', component: ConfirmationComponent
// },
{
  path:'', redirectTo:'/home',pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
