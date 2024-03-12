import { GenericResponse } from "../../../shared/Models/generic_response";

export interface SuadiSignup {
    nin: string;
    birthdateH: string;
  }
  export interface SuadiRegister {
    nin: string;
    birthdateH: string;
      registrationUUID:string;
      registrationSaudiRequest: {
          nin: string;
          birthdateH: string
  }
}

export interface SuadiSignupRes extends GenericResponse {
  data: Data; 
  }
  interface Data {
    id?: any;
    otpExpiry: string;
    registrationUUID: string;
    retryCount: number;
    lockExpiry?: any;
  }

  