import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(date: Date): string {
    // console.log(date);
    let formatted = new Date(date)

    const currentDate = new Date();

    if (formatted.getDate() === currentDate.getDate()) {
      return 'Today';
    } else if (formatted.getDate() === currentDate.getDate() + 1) {
      return 'Tomorrow';
    } else {
      return formatted.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    }
  }
}
