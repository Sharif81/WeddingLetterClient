import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


}
