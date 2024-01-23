import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../adminapi.service';
import { employeeModel } from '../employee.model';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  allEmployee:employeeModel[]=[]

  searchKey:any=""
// for pagination
  p: number = 1;

  ngOnInit(): void {
    this.listEmployee()
  }

  constructor(private api:AdminapiService){}

  delete(id:any){
    this.api.deleteEmployee(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire("Deleted!!")
        this.listEmployee()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  listEmployee(){
    this.api.showEmployeeApi().subscribe({
      next:(res:any)=>{
        // console.log(res);

        this.allEmployee=res
        console.log(this.allEmployee);
        
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  sort(){
    this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
  }

  sortN(){
    this.allEmployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  generatepdf(){
    const pdf = new jsPDF()
    let head = [['Id','Emaployee Name','Employee Email','Status']]

    let body:any=[]

    this.allEmployee.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.status])
    })

    // fontsize
    pdf.setFontSize(20)

    // Title
    pdf.text('Employee Details',10,10)

    // generate pdf 

    autoTable(pdf,{head,body})

    // open in new tab
    pdf.output('dataurlnewwindow')

    // save the pdf
    pdf.save('employeee.pdf')


  }

}
