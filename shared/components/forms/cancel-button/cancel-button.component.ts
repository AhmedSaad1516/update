import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss'],
  standalone: true,
  imports: [MatButtonModule]
})
export class CancelButtonComponent implements OnInit {
  
  @Input() label: string = '';
  @Input() tooltip: string = '';
  @Input() color: string = '';
  @Input() isDisabled: boolean = false;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() id: string = '';

  constructor() { }

  ngOnInit() {
  }

  handleClick(): void {
    if (!this.isDisabled) {
      this.buttonClick.emit();
    }
  }

}
