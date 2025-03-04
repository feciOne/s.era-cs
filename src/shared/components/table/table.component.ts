import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { IApplication } from '../../models';

interface Column {
    mainField: string
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-table',
    imports: [
        TableModule,
        ButtonModule,
    ],
    templateUrl: 'table.component.html',
    styleUrl: './table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
    #http = inject(HttpClient);
    applications!: IApplication[];

    selectedApplications!: IApplication[];

    constructor(private cdRef: ChangeDetectorRef) { }

    cols!: Column[];

    exportColumns!: ExportColumn[];

    ngOnInit() {
        this.#http.get<IApplication[]>('http://localhost:3000/applications')
            .subscribe((data) => {
                this.applications = data;
                this.cdRef.detectChanges();
            });

        this.cols = [
            { mainField: 'personalInfo', field: 'firstName', header: 'Name', customExportHeader: 'First Name' },
            { mainField: 'personalInfo', field: 'lastName', header: 'Surname' },
            { mainField: 'loanInfo', field: 'loanAmount', header: 'Loan Amount' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
}
