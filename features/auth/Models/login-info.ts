
export interface LoginInfo {
  username: string;
  password: string;
}

export interface LoginResponse {
  data:{
    token: string;
    refreshToken:string;
  }
}

export interface ForgetPassword {
  emailOrNationalId: string;
}

export interface ChangePassword {
  username: string,
    newPassword: string,
    confirmPassword: string
}