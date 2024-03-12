import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }
  // getErrorMessages(): string[] | null {
  //   const errorMessages: string[] = [];
  
  //   if (this.control?.hasError('required')) {
  //     errorMessages.push('This field is required');
  //   }
  
  //   // Add more error messages based on your validation requirements
  //   // For example, checking for other errors:
  //   if (this.control?.hasError('pattern')) {
  //     errorMessages.push('Invalid pattern');
  //   }
  
  //   // Add backend error if it exists
  //   if (this.backendError) {
  //     errorMessages.push(this.backendError);
  //   }
  
  //   return errorMessages.length > 0 ? errorMessages : null;
  // }
}
