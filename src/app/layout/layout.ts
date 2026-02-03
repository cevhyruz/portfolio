import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeader, AppFooter } from './';
import { ContainerComponent } from '@coreui/angular';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    AppHeader, AppFooter,
    ContainerComponent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
