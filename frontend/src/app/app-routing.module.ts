import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { ApproveComponent } from './approve/approve.component';
import { TrainerlistComponent } from './trainerlist/trainerlist.component';
import { AddcoursesComponent } from './addcourses/addcourses.component';

const routes: Routes = [{path:'', component:HomeComponent},
{path:'home', component:HomeComponent},
{path:'signup',component:SignupComponent},
{path:'login', component:LoginComponent},
{path:'approve', component:ApproveComponent,canActivate:[AuthGuard]},
{path:'trainers', component:TrainerlistComponent,canActivate:[AuthGuard]},
{path:'courses', component:AddcoursesComponent,canActivate:[AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
