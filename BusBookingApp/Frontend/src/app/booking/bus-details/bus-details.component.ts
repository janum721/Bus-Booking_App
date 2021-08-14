import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { plan } from 'src/app/shared/plan.model';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Data } from 'src/app/shared/Data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bus-details',
  templateUrl: './bus-details.component.html',
  styleUrls: ['./bus-details.component.css']
})

export class BusDetailsComponent implements OnInit {
 
  @Output("busesDetails") details= new EventEmitter();

  form= new FormGroup({
    boardingLocation:new FormControl('',Validators.required),
    destinationLocation: new FormControl('',Validators.required),
    travellingDate: new FormControl('',Validators.required)
  })

  get boardingLocation(){
    return this.form.get('boardingLocation');
  }
  get destinationLocation(){
    return this.form.get('destinationLocation');
  }
  get travellingDate(){
    return this.form.get('travellingDate');
  }
  
  d:any;
  currentDate:Date=new Date();
  places=["Chennai","Hyderabad","Bangalore","Coimbatore"];

  
  constructor(public service:UserService,public router:Router) { }
  ngOnInit(): void {
  }
 
  public response:plan[];
 
  public onResponse:boolean;
  public onError:boolean;
  onSubmit(form:FormGroup){

    let y=this.form.value.boardingLocation;
    let z=this.form.value.destinationLocation;

    this.service.getBus({from:this.form.value.boardingLocation,to:this.form.value.destinationLocation})
    .subscribe((res:Data)=>{
      this.response=res.buses;
      console.log(res);
    })
    
    this.form.controls['boardingLocation'].disable();
    this.form.controls['destinationLocation'].disable();
    this.form.controls['travellingDate'].disable();

    this.onResponse=true;
    this.onError=false;

    this.d=this.form.value.travellingDate;

    if(y===z){
      this.onError=true;
      this.onResponse=false;
    }


  }


  onEdit(){
    this.form.controls['boardingLocation'].enable();
    this.form.controls['destinationLocation'].enable();
    this.form.controls['travellingDate'].enable();
   
  }
  onClear(form:FormGroup){
    this.onResponse=false;
    this.onError=false;
    this.form.reset();
    this.form.controls['boardingLocation'].enable();
    this.form.controls['destinationLocation'].enable();
    this.form.controls['travellingDate'].enable();
  }
  
  busDetails:any;
  viewSeats(item:any){
    this.busDetails={
      id:item._id,
      from:this.form.value.boardingLocation,
      to:this.form.value.destinationLocation,
      date:this.form.value.travellingDate,
      busType:item.busType,
      available:item.available,
      fare:item.fare,
      bookedSeats:item.bookedSeats,
      totalSeats:item.totalSeats
    }
    this.details.emit(this.busDetails);
  }
}
