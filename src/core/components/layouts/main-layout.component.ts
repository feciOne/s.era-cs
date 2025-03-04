import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, HeaderComponent],
  template: `
  <app-header />
  <main class="container">
    <router-outlet />
  </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
