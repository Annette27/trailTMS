import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplistService } from '../applist.service';
import{ApplicationModel} from '../models/appl'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  showImage:boolean=false;
  imagewidth :number=50;
  imageheight :number=50;
  imagemargin:number=2;
  toggle(){
    this.showImage =!this.showImage;
  }
  applications:ApplicationModel[]=[];
private appsSubscription : Subscription;
  constructor(public router:Router,private AppService:ApplistService) { }
  approve(i:any){
    if(i.type){
      console.log(i)
      localStorage.setItem("approveId",i._id.toString());
      this.AppService.addtrainers(i)
      .subscribe((data)=>{
        this.applications=this.applications.filter(p =>p !== i)
      })
      alert("success")
     
     
    }
    else{
      alert("Select Employment type")
    }
  
  }

  deleteApp(i:any){
    this.AppService.deleteApp(i._id.toString())
    .subscribe((data)=>{
      this.applications=this.applications.filter(p =>p !== i)
    })
  }
  ngOnInit(): void {

    this.AppService.getApps();
this.appsSubscription=this.AppService
.getAppsStream()
.subscribe((applications:ApplicationModel[])=>{
this.applications=applications;
})
  }
  ngOnDestroy(){
    this.appsSubscription.unsubscribe();
  }

}
