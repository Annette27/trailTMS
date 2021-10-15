import { Component, OnInit } from '@angular/core';
import{AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { BatchModel } from '../models/batch';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApplistService } from '../applist.service';



@Component({
  selector: 'app-addcourses',
  templateUrl: './addcourses.component.html',
  styleUrls: ['./addcourses.component.css']
})
export class AddcoursesComponent implements OnInit {
  batch={
    name:'',
    course:'',
    courseid:''
  
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  batches:BatchModel[]=[];
  private courseSubscription : Subscription;
private batchSubscription : Subscription;
  constructor(public router:Router,private AppService :ApplistService,private fb:FormBuilder) { }
  courseForm =this.fb.group({
    course: new FormControl('',[Validators.required,this.noWhitespaceValidator]),
    courseid: new FormControl('',[Validators.required,this.noWhitespaceValidator]),
    batch : new FormControl('',[Validators.required,this.noWhitespaceValidator]),
 
  }
  )
  get f (){
    return this.courseForm.controls}

    newCourse(){
      console.log(this.batch)
      this.AppService.addcourses(this.batch)
      .subscribe(res=>{
    
     alert(JSON.parse(JSON.stringify(res)).error)
     this.AppService.getBatches();
this.batchSubscription=this.AppService
.getBatchesStream()
.subscribe((batches:BatchModel[])=>{
this.batches=batches;
console.log(batches)
})
     
      })
  this.courseForm.reset();
    }

    deleteCourse(i:any){
      this.AppService.deleteBatch(i._id.toString())
      .subscribe((data)=>{
        this.batches=this.batches.filter(p =>p !== i)
      })
    }
  ngOnInit(): void {
    this.AppService.getBatches();
this.batchSubscription=this.AppService
.getBatchesStream()
.subscribe((batches:BatchModel[])=>{
this.batches=batches;
})

  }
  ngOnDestroy(){
    // this.courseSubscription.unsubscribe();
    this.batchSubscription.unsubscribe();

  }

}
