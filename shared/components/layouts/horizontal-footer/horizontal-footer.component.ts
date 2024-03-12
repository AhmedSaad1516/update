import { Component, OnInit } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-horizontal-footer',
  templateUrl: './horizontal-footer.component.html',
  styleUrls: ['./horizontal-footer.component.scss'],
  standalone: true,
  imports: [FlexLayoutModule, FlexLayoutServerModule, TranslateModule],
})
export class HorizontalFooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
