import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { ParkingComponent } from './parking/parking.component';
import { VendorComponent } from './vendor/vendor.component';
import { SupportComponent } from './support/support.component';
import { SupportAdminComponent } from './support-admin/support-admin.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    // { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
    {path:'', component:LandingPageComponent},
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path:'home', component: HomeComponent },
    {path:'event', component:EventComponent},
    {path:'parking', component:ParkingComponent},
    {path:'vendor', component:VendorComponent},
    {path:'support', component:SupportComponent},
    {path:'supportAdmin', component:SupportAdminComponent},
    // {path:'', redirectTo:'login', pathMatch:'full'},

];
