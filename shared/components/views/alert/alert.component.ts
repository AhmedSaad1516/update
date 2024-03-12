import { Component, OnInit, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class AlertComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: string = '';

  constructor() {}

  ngOnInit() {}
}
