import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSizeFloor',
  standalone: true,
})
export class fileSizeFloor implements PipeTransform {
  transform(number: number): number {
    if (number !== null) {
      return Math.floor(number / 1024);
    } else {
      return 0;
    }
  }
}
