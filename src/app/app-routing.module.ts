import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path:'home' , component:HomeComponent
  },
  {
    path:'' , component:LoginComponent
  },
  {
    path:'users' , component:UsersComponent
  },
  {
    path:'dashboard' , component:DashboardComponent
  },
  {
    path:'employees',component:EmployeeListComponent
  },
  {
    path:'employee/add', component:EmployeeAddComponent
  },
  {
    path:'employee/edit/:id', component:EmployeeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
