import { Component} from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public themeService: ThemeService) { }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
