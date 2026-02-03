import { Injectable, inject, effect, afterNextRender, DestroyRef, DOCUMENT, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage';

export type ColorMode = 'light' | 'dark' | 'auto' | string | undefined;

@Injectable({
  providedIn: 'root',
})
export class ColorModeService {
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #localStorage = inject(LocalStorageService);

  readonly eventName = signal('ColorSchemeChange');
  readonly localStorageItemName: WritableSignal<string | undefined> = signal(undefined);
  readonly localStorageItemName$ = toObservable(this.localStorageItemName);
  readonly colorMode: WritableSignal<ColorMode> = signal(undefined);

  readonly #modeEffect = effect(() => {
    const mode = this.colorMode();
    if (mode) {
      const localStorageItemName = this.localStorageItemName();
      localStorageItemName && this.setStoredTheme(localStorageItemName, mode);
      this.#setTheme(mode);
    }
  });

  constructor() {
    afterNextRender({
      read: () => {
        this.localStorageItemName$
          .pipe(
            tap((params) => {
              this.colorMode.set(this.getDefaultScheme(params));
            }),
            takeUntilDestroyed(this.#destroyRef)
          )
          .subscribe();
      }
    });
  }

  getStoredTheme(localStorageItemName: string) {
    return this.#localStorage.getItem(localStorageItemName);
  }

  setStoredTheme(localStorageItemName: string, mode: string) {
    return this.#localStorage.setItem(localStorageItemName, mode);
  }

  removeStoredTheme(localStorageItemName: string) {
    this.#localStorage.removeItem(localStorageItemName);
  }

  getDefaultScheme(localStorageItemName: string | undefined) {
    if (this.#document.defaultView === undefined) {
      return this.getDatasetTheme();
    }

    const storedTheme = localStorageItemName && this.getStoredTheme(localStorageItemName);

    return storedTheme ?? this.getDatasetTheme();
  }

  getPrefersColorScheme() {
    return this.#document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : this.#document.defaultView?.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : undefined;
  }

  getDatasetTheme(): ColorMode {
    return <ColorMode>this.#document.documentElement.dataset['coreuiTheme'];
  }

  #setTheme(mode: ColorMode) {
    this.#document.documentElement.dataset['coreuiTheme'] =
      mode === 'auto' ? this.getPrefersColorScheme() : mode;

    const event = new Event(this.eventName());
    this.#document.documentElement.dispatchEvent(event);
  }
}
