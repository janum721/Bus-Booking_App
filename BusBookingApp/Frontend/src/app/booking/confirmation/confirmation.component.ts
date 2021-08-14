import { Component, Input, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
// import jsPDF from 'jspdf';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  // seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
  // passengerName = ["Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu", "Janu"];

  @Input("finalSummary") finalSummary: any;
  // @ViewChild('pdfTable') pdfTable: ElementRef;
  constructor() { }

  ngOnInit(): void {
    this.finalSummary = JSON.parse(localStorage.getItem('name'));
    console.log(this.finalSummary);
    localStorage.removeItem('name');
  }

  public downloadPDF() {


    const options = {

      filename: 'ticket.pdf',

      image: { type: 'jpeg' },

      html2canvas: {},

      jsPDF: { orientation: 'landscape' }

    }

    const element: Element = document.getElementById('pdfTable');



    html2pdf()

      .from(element)

      .set(options)

      .save()

  }
  // public downloadAsPDF() {
  //   const doc = new jsPDF();

  //   const pdfTable = this.pdfTable.nativeElement;

  //   var html = htmlToPdfmake(pdfTable.innerHTML);

  //   const documentDefinition = { content: html };
  //   pdfMake.createPdf(documentDefinition).open(); 

  // }



}
