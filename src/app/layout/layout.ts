import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeader, AppFooter } from './';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    AppHeader, AppFooter,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
