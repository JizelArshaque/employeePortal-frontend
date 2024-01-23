import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminapiService } from '../adminapi.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logged:boolean=false

    constructor(private route:Router,private api:AdminapiService){
      api.sharedData.subscribe((data:any)=>{
        this.logged=data  
      })
    }

  

  

  logout(){
    localStorage.removeItem("name")
    localStorage.removeItem("password")
    this.logged=false
    this.route.navigateByUrl("")

  }
}
