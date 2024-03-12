import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { TranslateModule } from '@ngx-translate/core';
import { SectorCard } from '../../../../features/individuals-portal/models/sector-card';

@Component({
  selector: 'sector-card',
  templateUrl: './sector-card.component.html',
  styleUrls: ['./sector-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    TranslateModule,
  ],
})
export class SectorCardComponent implements OnInit {
  @Input() sectorCard!: SectorCard[];

  constructor() {}

  ngOnInit() {}
  omer() {}
}
