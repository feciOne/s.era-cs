import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-list',
  imports: [
    TableComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {}
