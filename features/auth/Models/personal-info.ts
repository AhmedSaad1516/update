// export interface PersonalInfo {
//     id: string;
//     nationalID: string;
//     nameArabic: string;
//     nameEnglish: string;
//     idType: string;
//     idNumber: number;
//     gender: string;
//     birthdate_h: string;
//     birthdate_G: string;
//     email?: any;
//     mobile_number?: any;
//     password?: any;
//   }

export interface PersonalInfoSaudiReq {
  userOTP: string;
  registrationUUID: string;
  registrationSaudiRequest: RegistrationSaudiRequest ;
}
export interface PersonalInfoNonSaudiReq {
  userOTP: string;
  registrationUUID: string;
  registrationNonSaudiRequest:  registrationNonSaudiRequest;
}

interface RegistrationSaudiRequest {
  nin: string;
  birthdateH: string;
}
interface registrationNonSaudiRequest {
  iqama: string;
  birthDateG: string;
}

export interface sentOtp {
  data: otpData;
  error?: string;
  successful?: boolean;
  errorMessage?: string;
}
interface otpData {
    requestId: Number
}
export interface PersonalInfo {
  data: data;
  error?: string;
  successful?: boolean;
  errorMessage?: string;
}

interface data {
  // id_number: string,
  personBasicInfo: {
    birthDateG: string;
    familyName: string;
    familyNameT: string;
    fatherName: string;
    fatherNameT: string;
    firstNameT: string;
    firstName: string;
    grandFatherName: string;
    grandFatherNameT: string;
    occupationDescAr: string;
    sexDescAr: string;
    convertDate: ConvertDate;
  };
}
interface ConvertDate {
  dateString: string;
}
