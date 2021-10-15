import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={
    uname:'',
    password:''
  };
  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
 userVerify(){
  this.authservice.loginUser(this.user)
  .subscribe(res=>{
    if(res.token){
    localStorage.setItem('token',res.token)
      
    this.router.navigate(['/'])
    alert("success")
    }
    if(res.token1){
      localStorage.setItem('token1',res.token1)
      this.router.navigate(['/'])
      console.log("user");
    }
    else if(res.error=="Invalid User"){
      alert("Invalid User")
    }
   else  if(res.error=="Invalid password"){
      alert("Invalid Password")
    }
    
  })
 }
}
//     if(res.token){
//       localStorage.setItem('token',res.token)
        
//       this.router.navigate(['/'])
//       alert("success")
//       }
//       if(res.token1){
//         localStorage.setItem('token1',res.token1)
//         this.router.navigate(['/'])
//         console.log("user");
//       }
//       else if(res.error=="Invalid User"){
//         alert("Invalid User")
//       }
//      else  if(res.error=="Invalid password"){
//         alert("Invalid Password")
//       }
      
//     })
     
//     }
//   }
// }
//     this.authservice.loginUser(this.user)
//     .subscribe(
//       res=>{
//         if(res.token)
//         localStorage.setItem('token',res.token)
//         this.router.navigate([''])
//       }
//       if(res.token1){
//         localStorage.setItem('token1',res.token1)
//         this.router.navigate(['/'])
//         console.log("user");
//       }
//       else if(res.error=="Invalid User"){
//         alert("Invalid User")
//       }
//      else  if(res.error=="Invalid password"){
//         alert("Invalid Password")
//       }
//     )
//   }
// }
  