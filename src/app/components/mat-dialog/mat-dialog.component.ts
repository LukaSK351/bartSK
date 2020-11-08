import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MainComponent} from '../gallery-list/main.component';
import {FormControl} from '@angular/forms';
import {DataService} from '../../data/data.service';
import {HttpClient} from '@angular/common/http';
import {GalleryService} from '../../services/gallery.service';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent{
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MainComponent>,
               private dataSrvice: DataService, private http: HttpClient, private galleryService: GalleryService) { }
  cattegory = new FormControl('');

  files: any[] = [];
  urlFiles = [];
  url = [];
  msg = '';
  file;
  finalFiles;
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
    this.finalFiles = event.target.files;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      this.urlFiles.push(event.target.files[i]);
      // tslint:disable-next-line:variable-name
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
    this.url = event;
    this.finalFiles = event;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.length; i++){
      const reader = new FileReader();
      reader.readAsDataURL(event[i]);
      this.urlFiles.push(event[i]);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.msg = '';
      };
    }
  }

  add(){
    if (this.url === undefined){
      this.dialogRef.close();
      return;
    }
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0;  j < this.finalFiles.length; j++){
          this.galleryService.addImage(this.finalFiles[j], this.data);
      }
    // }
    this.dialogRef.close(this.finalFiles);
  }

}

