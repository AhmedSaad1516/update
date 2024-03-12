import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-shared-button',
  templateUrl: './shared-button.component.html',
  styleUrl: './shared-button.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule],
})
export class SharedButtonComponent {
  @Input() label: string = '';
  @Input() tooltip: string = '';
  @Input() color: string = 'primary';
  @Input() className: string = '';
  @Input() isDisabled: boolean = false;
  @Input() showSpinner: boolean = false;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() id: string = '';

  handleClick(): void {
    if (!this.isDisabled) {
      this.buttonClick.emit();
    }
  }
}
