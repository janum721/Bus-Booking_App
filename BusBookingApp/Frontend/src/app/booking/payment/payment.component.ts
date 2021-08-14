import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Input("summaryDetails") summaryDetails:any;
  @Output("ticketSummary") ticketSummary= new EventEmitter();

  Month=["01","02","03","04","05","06","07","08","09","10","11","12"];
  Year=["2022","2023","2024","2025","2026","2027","2028","2029","2030"];

  TransactionId=Math.random().toString(16).substr(4,12).toUpperCase();




  paymentForm=new FormGroup({
    cardType: new FormControl('',Validators.required),
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30),Validators.pattern('[a-zA-Z ]*')]),
    cardNo:new FormControl('',[Validators.required,Validators.minLength(16),Validators.maxLength(16),Validators.pattern('[0-9]*')]),
    month: new FormControl('',Validators.required),
    year: new FormControl('',Validators.required),
    cvv:new FormControl('',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(3),Validators.maxLength(3)])
  })
  get name(){
    return this.paymentForm.get('name');
  }
  get cardNo(){
    return this.paymentForm.get('cardNo');
  }
  get cvv(){
    return this.paymentForm.get('cvv');
  }
  get month(){
    return this.paymentForm.get('month');
  }
  get year(){
    return this.paymentForm.get('year');
  }
  constructor(public router:Router, public service:UserService) { }

  ngOnInit(): void {
    console.log(this.summaryDetails.seats);
  }
  tickets:any;
  onSubmit(paymentForm:FormGroup){

   this.service.updateDetails({
        id:this.summaryDetails.id,
        booked:this.summaryDetails.seats,
        available:this.summaryDetails.available
   }).subscribe(res=>{
        console.log(res);
   })

    alert("Payment Successful");

    this.tickets={
      from:this.summaryDetails.from,
     to:this.summaryDetails.to,
     date:this.summaryDetails.date,
     busType:this.summaryDetails.busType,
     fare:this.summaryDetails.fare,
     totalSeats:this.summaryDetails.totalSeats,
     seats:this.summaryDetails.seats,
     totalFare:this.summaryDetails.totalFare,
     serviceTax:this.summaryDetails.serviceTax,
     charge :this.summaryDetails.charge,
     passengerName:this.summaryDetails.passengerName
    }
    this.ticketSummary.emit(this.tickets);
  }


}
