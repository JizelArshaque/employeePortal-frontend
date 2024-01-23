import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeModel } from './employee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(private http:HttpClient) { }

  server_url="https://empbacknd.onrender.com"
  
  public sharedData = new BehaviorSubject(false)

  updatelogs(data:any){
    this.sharedData.next(data)
  }

  authorization(){
    return this.http.get(`${this.server_url}/employee/1`)
  }

  addEmployeeApi(employee:employeeModel){
    return this.http.post(`${this.server_url}/employee`,employee)
  }

  showEmployeeApi(){
    return this.http.get(`${this.server_url}/employee`)
  }

  deleteEmployee(id:string){
    return this.http.delete(`${this.server_url}/employee/${id}`)
  }

  viewEmployeeApi(id:string){
    return this.http.get(`${this.server_url}/employee/${id}`)
  }

  updateApi(id:any,employee:any){
    return this.http.put(`${this.server_url}/employee/${id}`,employee)
  }


  countApi(){
    return this.http.get(`${this.server_url}/employee`)
  }


  updateAdminApi(admin:any){
    return this.http.put(`${this.server_url}/employee/1`,admin)
  }
  

}
