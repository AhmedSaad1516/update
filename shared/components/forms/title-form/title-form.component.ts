import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

@Component({
  selector: 'app-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    CommonModule,
  ],
})
export class TitleFormComponent implements OnInit {
  @Input() title: string = '';
  @Input() srcLink: string = '';
  backgorundStyle: string = 'backgorund-style';

  constructor() {}

  ngOnInit() {
    if (this.title === '') this.backgorundStyle = '';
    else this.backgorundStyle = 'backgorund-style';
  }
}
