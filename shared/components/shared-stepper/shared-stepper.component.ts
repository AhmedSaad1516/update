import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-shared-stepper',
  templateUrl: './shared-stepper.component.html',
  styleUrls: ['./shared-stepper.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class SharedStepperComponent {
  @Input() steps: string[] = [];

  currentStep = 0;

  getProgress() {
    return ((this.currentStep + 1) / this.steps.length) * 100;
  }

  goToStep(index: number) {
    this.currentStep = index;
  }
}
