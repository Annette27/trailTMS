import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {TrainerModel} from '../models/trainers'
import { Subscription } from 'rxjs';
import { ApplistService } from '../applist.service';
import{FilterSettingsModel} from '@syncfusion/ej2-angular-grids'
import {CommandModel,CommandClickEventArgs,GridComponent,Column,IRow,EditSettingsModel} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-trainerlist',
  // templateUrl: './trainerlist.component.html',
  template:`
  <div margin-top=20 align='Center'>
  <div class="trial">Trainers List</div>
  <ejs-grid #grid [dataSource]="trainers" [filterSettings]='filterOptions' [allowFiltering]='true' [editSettings]='editSettings' (commandClick)='commandClick($event)' width=1500>
  <e-columns>
  <e-column  headerText='Image'  textAlign='Center'  width=50> <ng-template #template let-trainers> 
  <img height=50 width=50 src={{trainers.imagepath}} /> 
  </ng-template> </e-column>
  <e-column  field='id' headerText='ID' textAlign='Center' width=50></e-column>

  <e-column  field='name' headerText='Name' textAlign='Center' width=50></e-column>

  <e-column field='course' headerText='Course' textAlign='Center' width=50></e-column>
  <e-column field='skillSet' headerText='Skill Set' textAlign='Center' width=50></e-column>
  <e-column field='type' headerText='Type of Employment' textAlign='Center' width=50></e-column>
  <e-column headerText='Allocate' width=50 [commands]='commands'></e-column>
   </e-columns>
    </ejs-grid>
  </div>
  `,
  styleUrls: ['./trainerlist.component.css']
})
export class TrainerlistComponent implements OnInit {
  public filterOptions:FilterSettingsModel={
    ignoreAccent:true,
    type:"Excel"
  }
  public editSettings:EditSettingsModel;
  public commands:CommandModel[];
  trainers:TrainerModel[];
  private appsSubscription : Subscription;
  constructor(private AppService :ApplistService) { }

  ngOnInit(): void {
    this.AppService.getTrainers();
    this.appsSubscription=this.AppService
    .getTrainersStream()
    .subscribe((trainers:TrainerModel[])=>{
    this.trainers=trainers;
    })
    this.editSettings = { allowEditing: true, allowDeleting: true };
    this.commands = [{ buttonOption: { content: 'ALLOCATE', cssClass: 'e-flat' } }];
  }
  commandClick(args: CommandClickEventArgs): void {
    let id=JSON.parse(JSON.stringify(args.rowData))._id
    localStorage.setItem("allocationId",id);
    alert("Allocate")
  
  
}

}
