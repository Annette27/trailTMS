import { Component, OnInit } from '@angular/core';
import{AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Router, Routes } from '@angular/router';
import { NewapplistService } from '../newapplist.service';
import {createPasswordStrengthValidator} from './validate'
import { faCoffee,faKey,faPhone,faEnvelope,faUserAlt,faMapMarkerAlt,faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { CourseModel } from '../models/courses';
import { Subscription } from 'rxjs';
import { ApplistService } from '../applist.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  faCoffee = faCoffee;
  faKey=faKey;
  faPhone=faPhone;
  faEnvelope=faEnvelope;
  faUserAlt=faUserAlt;
  faMapMarkerAlt=faMapMarkerAlt;
  faUserGraduate=faUserGraduate;
 trainer = {
    name: '',
    email:'',
     phone:'',
     address:'',
     highestQualification:'',
     skillSet:'',
     companyName:'',
     designation:'',
     course:'',
    image:'',
    imagepath:'',
    id:'',
    password:'',
    password1:''
    }
    courses:CourseModel[]=[];
    private courseSubscription : Subscription;
    public noWhitespaceValidator(control: FormControl) {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
  }
   
imageData:string;

  constructor(private fb:FormBuilder, private router:Router, private newAppList:NewapplistService,private AppService :ApplistService) {}

    registerForm =this.fb.group({
      name:new FormControl('',[Validators.required,Validators.minLength(3),this.noWhitespaceValidator]),
      email:new FormControl('',[Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),Validators.required]),
      phone: new FormControl('',[Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
      ]),
      address: new FormControl('',[Validators.required,this.noWhitespaceValidator]),
      highestQualification : new FormControl('',[Validators.required,this.noWhitespaceValidator]),
      skillSet: new FormControl('',[Validators.required,this.noWhitespaceValidator]),
      companyName: new FormControl('',[Validators.required,this.noWhitespaceValidator]),
      designation: new FormControl('',[Validators.required]),
      course: new FormControl('',[Validators.required]),
      image: new FormControl('',[Validators.required]),
      // id: new FormControl('',[Validators.required,Validators.minLength(1)]),
      password:new FormControl('',[Validators.required,createPasswordStrengthValidator(),Validators.minLength(8)]),
      password1:new FormControl('',[Validators.required])
    },
    {validators:this.MustMatch('password','password1') 
   }
    )
   

images:any
filename:string
url: any = undefined;

submitImage(event:any){
  this.images=event.target.files[0]
  this.filename = this.images.name;
  const reader = new FileReader();
  reader.readAsDataURL(this.images);
  reader.onload = (_event) => {
    this.url = reader.result;
     }
}

// onFileSelect(event:Event){
//   const file= (event.target as HTMLInputElement).files[0]
//   const allowedMimeTypes =[ "image/png","image/jpeg","image/jpg"]
//   this.registerForm.patchValue({image:file})
//   if(file && allowedMimeTypes.includes(file.type) ){
//     const reader = new FileReader();
//     reader.onload=()=>{
//       this.imageData = reader.result as string;
//       // console.log(this.imageData)
//     }
//     reader.readAsDataURL(file);
//   }

// }


newSignup(){
  this.trainer.imagepath=this.url;
  this.trainer.image=this.filename;
  // console.log(this.trainer)
  this.newAppList.newtrainer(this.trainer)
  .subscribe((res)=>{
    if(res.error==='User Already exists'){
      alert("Already applied");
     this.router.navigate(['/']);

    }
    else if(res.error==='new User'){
      alert("Sucessfully applied");
      this.router.navigate(['/']);

    }
  })
}

   get f (){
    return this.registerForm.controls}
    
  MustMatch(controlName:string,matchingControlName:string){
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName]
      if(matchingControl.errors && ! matchingControl.errors.MustMatch){
   return 
      }
      if(control.value!==matchingControl.value){
        matchingControl.setErrors({MustMatch:true})
      }
      else{
        matchingControl.setErrors(null)
      }
    }
  }

  ngOnInit(): void {
// this.newAppList.idNum().subscribe(res=>{
//   this.trainer.id=res.id
//   // console.log(res.id)
// })
this.AppService.getCourses();
this.courseSubscription=this.AppService
.getCoursesStream()
.subscribe((courses:CourseModel[])=>{
this.courses=courses;
})

  }


}
