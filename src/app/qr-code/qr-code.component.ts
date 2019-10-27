import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import QRCode from 'qrcode';
import canvasToImage from 'canvas-to-image';
import { TodoListData } from '../dataTypes/TodoListData';
import qrcodeParser from 'qrcode-parser';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  @Input() todolist:TodoListData;
  @Output() qrcodeUploaded:EventEmitter<TodoListData> = new EventEmitter();

  private canvas:HTMLElement;

  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById('canvas');
  }
  
  /**
   * Generate a QRCode and save it
   */
  generateQRCode(){
    //Converts the todolist into a QR Code in a canvas
    QRCode.toCanvas(this.canvas, JSON.stringify(this.todolist));
    
    //Download the canvas image
    canvasToImage('canvas');
  }

  /**
   * Load a QR code from an image file
   */
  loadQRCode(event){
    //Retrieves the uploaded file and decodes it
    let file = event.target.files[0];
    qrcodeParser(file)
    .then(res => {
      alert("QR code chargé ! ");
      //Send an event with loaded JSON object
      this.qrcodeUploaded.emit(JSON.parse(res.data));
    })
    .catch(error=>{
      alert('Erreur dans le décodage du QR code, fichier non valide. ');
    })
  }
}
