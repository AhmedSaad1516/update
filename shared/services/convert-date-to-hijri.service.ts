import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import * as hijriConverter from 'hijri-converter';

@Injectable({
  providedIn: 'root'
})
export class ConvertDateToHijriService {

  constructor() { }
  convertToHijri(gregorianDate: string): string | null {
    try {
      const gregorianDateObj = new Date(gregorianDate);
      
      // Convert to Hijri date
      const hijriDate = hijriConverter.toHijri(
        gregorianDateObj.getFullYear(),
        gregorianDateObj.getMonth() + 1, // Months are zero-based in JavaScript
        gregorianDateObj.getDate()
      );
  
      // Format the Hijri date
      const formattedHijriDate = `${hijriDate.hy}-${String(hijriDate.hm).padStart(2, '0')}`;
  
      return formattedHijriDate;
    } catch (error) {
      console.error('Error converting to Hijri date:', error);
      return null;
    }
  }

  convertToHijrDateFrmat2(gregorianDate: string): string | null {
    try {
      const gregorianDateObj = new Date(gregorianDate);
  
      // Convert to Hijri date
      const hijriDate = hijriConverter.toHijri(
        gregorianDateObj.getFullYear(),
        gregorianDateObj.getMonth() + 1, // Months are zero-based in JavaScript
        gregorianDateObj.getDate()
      );
  
      // Format the Hijri date
      const formattedHijriDate = `${hijriDate.hy}-${String(hijriDate.hm).padStart(2, '0')}-${String(hijriDate.hd).padStart(2, '0')}`;
  
      return formattedHijriDate;
    } catch (error) {
      console.error('Error converting to Hijri date:', error);
      return null;
    }
  }
  

  
  
}
