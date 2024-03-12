import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TranslateModule,
    MatChipsModule,
  ],
})
export class DataTableComponent implements AfterViewInit, OnChanges {
  @Input() dataSourceTable: any = [];
  @Input() displayedColumns: any = {};
  @Input() isFilter: boolean = false;
  objectKeys = Object.keys;

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  lengthColspan: number = 0;

  constructor() {}

  ngAfterViewInit() {
    this.createDataSource();
  }

  ngOnChanges() {
    this.createDataSource();
  }

  createDataSource() {
    this.lengthColspan = this.objectKeys(this.displayedColumns).length;
    this.dataSource = new MatTableDataSource(this.dataSourceTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
