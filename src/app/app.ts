import { Component, DestroyRef, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './core/icon-subset';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class App implements OnInit {
  protected readonly title = signal('portfolio');

  protected readonly destroyRef: DestroyRef = inject(DestroyRef);
  protected readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  protected readonly colorModeService = inject(ColorModeService);
  protected readonly iconSetService = inject(IconSetService);

  constructor() {
    this.iconSetService.icons = { ...iconSubset };
    this.colorModeService.localStorageItemName.set('theme-default');
    this.colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.colorModeService.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
