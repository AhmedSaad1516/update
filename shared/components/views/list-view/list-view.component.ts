import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  standalone: true,
  imports: [MatListModule],
})
export class ListViewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
