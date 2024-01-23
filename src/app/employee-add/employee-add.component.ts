import { Component } from '@angular/core';
import { employeeModel } from '../employee.model';
import { AdminapiService } from '../adminapi.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
// variable to store the input from details from employee add

employee:employeeModel={}

constructor (private api:AdminapiService, private router:Router){}

cancel(){
  this.employee={}
}

addEmploy(){
  console.log(this.employee);

  if(!this.employee.name|| !this.employee.email ||!this.employee.id||!this.employee.status){
    Swal.fire("Save failed")
  }
  else{
    this.api.addEmployeeApi(this.employee).subscribe({
      next:(res:employeeModel)=>{
        console.log(res);
        Swal.fire("Save successful");
        this.employee={}
        this.router.navigateByUrl('employees')
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

  }

  
  
}

}
