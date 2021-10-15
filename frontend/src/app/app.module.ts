import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule,ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import {GridModule,FilterService,CommandColumnService} from '@syncfusion/ej2-angular-grids'

//import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NewapplistService } from './newapplist.service';

import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApproveComponent } from './approve/approve.component';
import { TrainerlistComponent } from './trainerlist/trainerlist.component';
import { FooterComponent } from './footer/footer.component';
import { AddcoursesComponent } from './addcourses/addcourses.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    ApproveComponent,
    TrainerlistComponent,
    FooterComponent,
    AddcoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    GridModule
  ],
  providers: [NewapplistService,AuthService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true //means it can handle multiple request
    },FilterService,CommandColumnService],
  bootstrap: [AppComponent]
})
export class AppModule { }
