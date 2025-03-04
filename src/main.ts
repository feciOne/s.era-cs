import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { EmptyLayoutComponent } from './core/components/layouts/empty-layout.component';

bootstrapApplication(EmptyLayoutComponent, appConfig)
  .catch((err) => console.error(err));
