import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers:[
   {
    provide:HTTP_INTERCEPTORS,
    useClass:authInterceptor,
    multi:true
   }
  ]
})
export class CoreAuthModule { }
