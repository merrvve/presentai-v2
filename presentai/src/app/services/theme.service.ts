import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.documentElement.classList.toggle('dark', this.darkMode);
    if (this.darkMode) {
      localStorage.setItem('mode', 'dark');
    } else {
      localStorage.setItem('mode', 'light');
    }
  }

  isDarkMode() {
    return this.darkMode;
  }

  constructor() {
    let mode = localStorage.getItem('mode');
    if (mode == 'dark') {
      this.darkMode = true;
    } else if (mode == 'light') {
      this.darkMode = false;
    } else {
      this.darkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    document.documentElement.classList.toggle('dark', this.darkMode);
  }
}
