import { Injectable } from '@angular/core';
import {ApplicationModel} from './models/appl'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TrainerModel} from './models/trainers'
import {CourseModel} from './models/courses'
import {BatchModel} from './models/batch'


@Injectable({
  providedIn: 'root'
})
export class ApplistService {
  applications:ApplicationModel[]=[];
  trainers:TrainerModel[]=[];
  courses:CourseModel[]=[];
  batches:BatchModel[]=[];

  private apps$ = new Subject<ApplicationModel[]>()
  private trainers$ = new Subject<TrainerModel[]>()
  private courses$ = new Subject<CourseModel[]>()
  private batches$ = new Subject<BatchModel[]>()


  constructor( private http :HttpClient) { }
  addcourses(item:any){
    console.log(item)
    return this.http.post("http://localhost:3000/course",{"batch":item})

}
deleteBatch(id:any){
  return this.http.delete("http://localhost:3000/delete/"+id)
  
  
    }

  addtrainers(item){
    return this.http.post("http://localhost:3000/trainer",{"trainer":item})
    
  }
  deleteApp(id:any){
    return this.http.delete("http://localhost:3000/remove/"+id)
    
    
      }

  getApps(){
    this.http
    .get<{applications:ApplicationModel[]}>("http://localhost:3000/applications")
    .pipe(
      map((appData)=>{
        return appData.applications;
      })
    )
    .subscribe((applications)=>{
      this.applications = applications;
      // console.log(books)
      this.apps$.next(this.applications);
    })


  }

  getAppsStream(){
    return this.apps$.asObservable();

}

getCourses(){
  this.http
  .get<{courses:CourseModel[]}>("http://localhost:3000/courses")
  .pipe(
    map((courseData)=>{
      return courseData.courses;
    })
  )
  .subscribe((courses)=>{
    this.courses = courses;
    // console.log(books)
    this.courses$.next(this.courses);
  })


}
getBatches(){
  this.http
  .get<{batches:BatchModel[]}>("http://localhost:3000/batches")
  .pipe(
    map((batchData)=>{
      return batchData.batches;
    })
  )
  .subscribe((batches)=>{
    this.batches = batches;
    // console.log(books)
    this.batches$.next(this.batches);
  })


}

getCoursesStream(){
  return this.courses$.asObservable();

}
getBatchesStream(){
return this.batches$.asObservable();

}

getTrainers(){
  this.http
  .get<{trainers:TrainerModel[]}>("http://localhost:3000/trainers")
  .pipe(
    map((trainerData)=>{
      return trainerData.trainers;
    })
  )
  .subscribe((trainers)=>{
    this.trainers = trainers;
    // console.log(books)
    this.trainers$.next(this.trainers);
  })


}
getTrainersStream(){
  return this.trainers$.asObservable();

}

}
