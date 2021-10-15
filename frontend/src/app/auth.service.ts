import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUser(user:any){
    return this.Http.post<any>("http://localhost:3000/login",user)
     //.subscribe((data)=>{console.log("sucess")})
   
    
  }

  constructor(private Http:HttpClient) { }
  loggedin(){
    return !!localStorage.getItem('token')
    
  }
  getToken(){
    return  localStorage.getItem('token')
    }
    loggedUser(){
      return !!  localStorage.getItem('token1');
    }
    getToken2(){
      return localStorage.getItem('token1');
    }
}
