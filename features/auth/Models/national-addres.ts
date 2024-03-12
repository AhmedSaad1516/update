
   export interface NationalAddressReq {
    mobileNumber: string;
        email: string;
        password: string;
        repeatPassword:string;
        // yaqeen_form_id: string;
        userOTP:string;
        registrationRequest:{
          yaqeenRequestUUID:string;
          registrationSaudiRequest:{}
        }
      }

      export interface NationalAddressRequest {
        attachmentIds: [],
        shortAddress: string,
        buildingNumber: string,
        street: string,
        subNumber: string,
        district: string,
        postalCode: string,
        city: string,
        country: string
          }

    export  interface NationalAddressRes {
        TaqeemOTP: string;
      }
        