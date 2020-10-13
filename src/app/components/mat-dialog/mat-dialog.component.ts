import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MainComponent} from '../../views/main/main.component';
import {FormControl} from '@angular/forms';
import {DataService} from '../../data/data.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent{
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MainComponent>,
               private dataSrvice: DataService, private http: HttpClient ) { }
  cattegory = new FormControl('');

  files: any[] = [];
  urlFiles = [];
  url = [];
  msg = '';
  selectFile(event) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.msg = 'You must select an image';
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    for (let i = 0; i < event.target.files.length; i++){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      this.urlFiles.push(event.target.files[i]);
      reader.onload = (_event) => {
      this.msg = '';
      this.url.push(reader.result);
    };
    }
  }

  close() {
    this.dialogRef.close(this.cattegory.value);
  }

  onFileDropped(event) {
    if (!event[0] || event[0].length === 0) {
      this.msg = 'You must select an image';
      return;
    }
    const mimeType = event[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    for (let i = 0; i < event.length; i++){
      const reader = new FileReader();

      reader.readAsDataURL(event[i]);
      this.urlFiles.push(event[i]);
      reader.onload = (_event) => {
        this.msg = '';
        this.url.push(reader.result);
      };
    }
  }

  pridja(){
    if (this.url === undefined){
      this.dialogRef.close();
      return;
    }
    for (let i = 0; i < this.url.length; i++){
      const photo = {
        label: this.data,
        icon: this.url[i],
      };
      this.dataSrvice.addPhoto(photo);
      const kategoria = this.dataSrvice.katerogie.find(kat => kat.label === this.data);
      kategoria.icon = this.url[i];
    }
    this.dialogRef.close();
  }
  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  // formatBytes(bytes) {
  //   if (bytes === 0) {
  //     return '0 Bytes';
  //   }
  //   const k = 1024;
  //   // const dm = decimals <= 0 ? 0 : decimals || 2;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed()) + ' ' + sizes[i];
  // }
}

