import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { AllCompaniesComponent } from './layout/companies/all-companies/all-companies.component';
import { PackagesComponent } from './layout/packages/packages.component';
import { EventsComponent } from './layout/events/events.component';
import { VenueComponent } from './layout/venue/venue.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    SidebarComponent,
    AllCompaniesComponent,
    PackagesComponent,
    EventsComponent,
    VenueComponent
       
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WeddingLetterApp';
}
