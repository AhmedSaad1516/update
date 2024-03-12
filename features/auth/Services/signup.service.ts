import { PersonalInfo } from './../Models/personal-info';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  PersonalInfo:PersonalInfo={
    data:{
      personBasicInfo:{

        birthDateG: '',
        familyName: '',
        familyNameT: '',
        fatherName: '',
        fatherNameT: '',
        firstNameT: '',
        firstName: '',
        grandFatherName: '',
        grandFatherNameT: '',
        occupationDescAr: '',
        sexDescAr: '',
        convertDate:{
          dateString:''
        }
      }
    }
  };
  constructor() { }
}
