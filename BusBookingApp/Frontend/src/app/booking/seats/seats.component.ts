import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BusDetailsComponent } from '../bus-details/bus-details.component';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css'],
  providers:[BusDetailsComponent]
})
export class SeatsComponent implements OnInit {
  
  @Input("busDetails") busDetails:any;
  @Output ("summary") summary= new EventEmitter();
  
  arr:number[]=[];
  reservedSeats:number[] =[];
  i:any;

  constructor(private router:Router,public service:UserService) { }
  ngOnInit(): void {
      this.reservedSeats=this.busDetails.bookedSeats
  }

 
  totalFare:number=0;
  count=0;
  tax:number=0;
  total:number=0;
  totalCharge:number=0;
  seatsSelection=[];
  temp=[]; //push the selections
  busObj = {
    totalSeats : 40,
    };

  seats = [...new Array(this.busObj.totalSeats)].map((item, index) => {
  return {
    isSelected : false,
    seatno : index +1 
  };
  });
 
  onPayment:boolean;
  //Seats Selection
  selectSeats(seatno){

    if(!this.reservedSeats.includes(seatno)){
    this.seats[seatno-1].isSelected = !this.seats[seatno-1].isSelected;
    if(this.seatsSelection.includes(seatno)){
      this.seatsSelection.splice(this.seatsSelection.indexOf(seatno),1);
      if(this.seatsSelection.length===0){
      this.onPayment=false;
      }
    } 
    else {
      this.seatsSelection.push(seatno);
      this.onPayment=true;
    }
  }
  this.total=this.seatsSelection.length
  this.totalFare=this.busDetails.fare*this.total
  this.tax=this.totalFare/10
  this.totalCharge= this.totalFare+this.tax
}
  
summaryDetails:any;
payment(form){
   this.summaryDetails={
    id:this.busDetails.id,
     from:this.busDetails.from,
     to:this.busDetails.to,
     date:this.busDetails.date,
     busType:this.busDetails.busType,
     available:this.busDetails.available,
     fare:this.busDetails.fare,
     totalSeats:this.total,
     seats:this.seatsSelection,
     totalFare:this.totalFare,
     serviceTax:this.tax,
     charge :this.totalCharge,
     passengerName: Object.values(form.value)
   }
   this.summary.emit(this.summaryDetails);
   localStorage.setItem('name', JSON.stringify(this.summaryDetails));
}

}
