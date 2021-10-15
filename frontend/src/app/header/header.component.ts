import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router:Router, public authservice:AuthService) { }
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('token1');
    localStorage.removeItem('approveId');
    localStorage.removeItem('allocationId');



    this.router.navigate(['/'])

  }
  ngOnInit(): void {
  }

}
