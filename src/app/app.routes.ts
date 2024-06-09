import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AllCompaniesComponent } from './layout/companies/all-companies/all-companies.component';
import { PackagesComponent } from './layout/packages/packages.component';
import { EventsComponent } from './layout/events/events.component';
import { ViewEventsComponent } from './layout/view-events/view-events.component';
import { VenueComponent } from './layout/venue/venue.component';
import { PaymentsComponent } from './layout/payments/payments.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'companies', component: AllCompaniesComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'packages', component: PackagesComponent },
    { path: 'create-events', component: EventsComponent },
    { path: 'view-events', component: ViewEventsComponent },
    { path: 'venue', component: VenueComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
