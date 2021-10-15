import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NewapplistService {


  newtrainer(item:any){
    // console.log(item)
    return this.http.post<any>("http://localhost:3000/newappl",{"trainer":item});
    
  }
  // idNum(){
  //   return this.http.get<any>("http://localhost:3000/id")
    

  // }
  constructor(private http :HttpClient) { }
}
