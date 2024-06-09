import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AllCompaniesComponent } from '../companies/all-companies/all-companies.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, RouterLink, RouterLinkActive, AllCompaniesComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
