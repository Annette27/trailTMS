import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  constructor(private injector:Injector) { }
  intercept(req:any,nxt:any){
    let authservice=this.injector.get(AuthService)
    let tokenizedReq=req.clone(
      {
        setHeaders:{
          Authorization:`Bearer ${authservice.getToken()} ${authservice.getToken2()}`
        }
      }
    )
       return nxt.handle(tokenizedReq)
  }
}
