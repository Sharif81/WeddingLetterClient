import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AllCompaniesComponent } from '../companies/all-companies/all-companies.component';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgFor, NgForOf, SidebarComponent, RouterLink, RouterLinkActive, AllCompaniesComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

}
