import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminapiService } from '../adminapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string=""
  password:string=""

  constructor(private api:AdminapiService, private router:Router){}

  login(){
    if(!this.email || !this.password){
      Swal.fire("Please fill the form completely!")
    }else{
      this.api.authorization().subscribe({
        next:(res:any)=>{
          const{email,password} = res
  
          if(email==this.email && password==this.password){
            Swal.fire("Login successful");

            // update shared data
            this.api.updatelogs({data:true})

            // Save data in localstorage for admin dets
            localStorage.setItem("name",res.name)
            localStorage.setItem("password",res.password)
            // navigate
            this.router.navigateByUrl('dashboard')

            

          }else{
            Swal.fire("Invalid Credentials!")
          }
        },
        error:(res:any)=>{
          console.log(res);
          
  
        }
      })
      
    }

    
  }
}
