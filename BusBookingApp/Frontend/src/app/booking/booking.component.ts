import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  busInfo:any|null=null;
  payments:any|null=null;
  ticket:any|null=null;
  constructor() { }
  getDetails(value:any){
    this.busInfo=value;
    console.log(this.busInfo);
  }
  getSummary(value:any){
    this.payments=value;
  }
  getTickets(value:any){
    this.ticket=value;
  }

  ngOnInit(): void {

  }

}
