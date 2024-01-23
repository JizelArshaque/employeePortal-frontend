import { Component, OnInit } from '@angular/core';
import { employeeModel } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminapiService } from '../adminapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {


  constructor(private route:ActivatedRoute, private api:AdminapiService,private routedd:Router){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      // console.log(res.id);
      const {id}=res

      this.editEmployee(id)
      
    })  
  }

  employee:employeeModel={}
  sample:any=""

  editEmployee(id:any){
    this.api.viewEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.employee=res
        this.sample=res.id
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  update(id:any){
    this.api.updateApi(id,this.employee).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire('Update Successful')
        this.routedd.navigateByUrl('/employees')

        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  cancelF(){
    this.editEmployee(this.sample)

     
  }

}
