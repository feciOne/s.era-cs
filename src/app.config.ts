import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';

import { FilterMatchMode } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';

import { routes } from './app.routes';
import { DEVTOOLS_REDUX_CONFIG, LOCAL_STORAGE_CONFIG, LOGGER_CONFIG, OPTIONS_CONFIG, STATES_MODULES } from './store/store.config';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Material,
        options: {
          // eslint-disable-next-line no-constant-binary-expression
          darkModeSelector: false || 'none',
        }
      },
      filterMatchModeOptions: {
        text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
        numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
        date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
      },
    }),
    provideStore(
      [...STATES_MODULES],
      OPTIONS_CONFIG,
      withNgxsStoragePlugin(LOCAL_STORAGE_CONFIG),
      withNgxsReduxDevtoolsPlugin(DEVTOOLS_REDUX_CONFIG),
      withNgxsLoggerPlugin(LOGGER_CONFIG)
    ),
  ]
};
