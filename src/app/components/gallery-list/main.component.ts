import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../data/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialogComponent} from '../mat-dialog/mat-dialog.component';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {GalleryService} from '../../services/gallery.service';
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Output() imageSrc = new EventEmitter<string>();
  galleries;
  galleries2;
  url = [];
  reader;

  constructor(public dataService: DataService, private toastr: ToastrService, private dialog: MatDialog, private galleryService: GalleryService, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.galleryService.getGalleries().subscribe(galleries => {
      this.galleries = galleries;
      this.galleries = this.galleries.galleries;
    });
  }

  sendImageToHeader(image){
    this.imageSrc.emit(image);
  }

  openAddFileDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '23em';
    const dialogRef = this.dialog.open(MatDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value === undefined){
        return;
      }else {
        this.addHttpCategory(value);
      }
    });
  }

  addCategory(name){
      if (name === ''){
        return;
      }
      const newCategory = {
      label: name,
        icon: 'assets/gallery/no-image.jpg',
       };
      this.dataService.addCategory(newCategory);
  }

  async addHttpCategory(nameOfCategory){
    if (nameOfCategory === ''){
      return;
    }
    const newGallery = {
      name: nameOfCategory,
      path: nameOfCategory
    };

    this.galleryService.addGallery(nameOfCategory)
      .then(data => {
        if (data instanceof HttpErrorResponse){
          this.toastr.error('Zadajte iny nazov galerie');
        }
        else{
          this.galleries.push(newGallery);
        }
    })
      .catch(err => {
        console.log(err);
      });
  }
}

