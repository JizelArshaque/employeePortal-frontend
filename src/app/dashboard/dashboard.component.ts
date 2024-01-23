import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../adminapi.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    this.getCount()

    if(localStorage.getItem("name")){
      this.Aname=localStorage.getItem("name")
    }

    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.AdminDets=res
      if(res.picture){
        this.profImage=res.picture
      }
      
    })
    

    
  }
 
  constructor(private api:AdminapiService){
    this.chartOptions= {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Employee Locations'
      },
      tooltip: {
          valueSuffix: '%'
      },
      credits: {
        enabled:false
      },
      plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },
      series: [
          {
              name: 'Percentage',
              colorByPoint: true,
              data: [
                  {
                      name: 'Water',
                      y: 55.02
                  },
                  {
                      name: 'Fat',
                      sliced: true,
                      selected: true,
                      y: 26.71
                  },
                  {
                      name: 'Carbohydrates',
                      y: 1.09
                  },
                  {
                      name: 'Protein',
                      y: 15.5
                  },
                  {
                      name: 'Ash',
                      y: 1.68
                  }
              ]
          }
      ]
  }
  HC_exporting(Highcharts);


  }
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions = {} 
    sideBar:boolean= true
    employeeCount:number=0
    selected: Date =new Date()

    profImage:string="./assets/images/user.png"


    editAdminS:boolean=false

    Aname:any=""
    AdminDets:any={}

    edit(){
      this.editAdminS=true
    }

    menuBar(){
      this.sideBar=!this.sideBar
    }

    getCount(){
      this.api.countApi().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.employeeCount=res.length
         
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }


    getfile(event:any){
      let SetFile = event.target.files[0]
      console.log(SetFile);

      let fr = new FileReader()

      // read
      fr.readAsDataURL(SetFile)
      // convert
      fr.onload=(event:any)=>{
        // console.log(event.target.result);
        this.profImage=event.target.result
        this.AdminDets.picture=event.target.result      }
      
    }

    Updatess(){
      this.api.updateAdminApi(this.AdminDets).subscribe({
        next:(res:any)=>{
          console.log(res); 
          Swal.fire("Update successful!!")
          // aa
          localStorage.setItem("name",res.name)
          localStorage.setItem("password",res.password)
          this.Aname=localStorage.getItem("name")
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }

    cancel(){
      this.api.authorization().subscribe((res:any)=>{
        console.log(res);
        this.AdminDets=res
        if(res.picture){
          this.profImage=res.picture
        }
        
      })
      this.editAdminS=false


    }

    
}
