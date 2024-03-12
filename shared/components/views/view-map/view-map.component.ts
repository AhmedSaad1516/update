import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { AssetInformation } from '../../../../features/individuals-portal/models/asset-information';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

@Component({
  selector: 'view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    TranslateModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
  ],
})
export class ViewMapComponent implements OnInit {
  constructor() {}

  @Input() googleMapAddress!: AssetInformation;
  ngOnInit() {}
}
