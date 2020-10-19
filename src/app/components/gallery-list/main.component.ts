import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../data/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialogComponent} from '../mat-dialog/mat-dialog.component';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {GalleryService} from '../../services/gallery.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Output() imageSrc = new EventEmitter<string>();
  galleries;
  galleries2;
  imageToShow;
  url = [];
  reader ;

    constructor(public dataService: DataService, private dialog: MatDialog, private galleryService: GalleryService, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    // this.galleries = this.dataService.galleries();
    this.galleries = this.galleryService.getGalleries().subscribe(galleries => {
      this.galleries = galleries;
      this.galleries = this.galleries.galleries;
      // console.log(this.galleries);
    });
    // this.skuska()
  }

  skuska(){
      this.galleryService.getImage(0,0, 'new/pexels-photo-24464.jpg').subscribe(data =>{
      });
  }

   findImage(gallery){

      // if (gallery.image == undefined){
      //   return '../assets/gallery/no-image.jpg';
      // }
      //  else{
      //    this.galleryService.getImage(0, 0, gallery.image.fullpath).subscribe(data => {
      //      var premenna = URL.createObjectURL(data)
      //     console.log(premenna.slice(5));
      //      if (this.url == null )
      //     this.url =  premenna.slice(5) ;
      //
      //   }, error => {
      //     console.log(error)
      //   });
      // }
     return '../assets/gallery/no-image.jpg';
  }

  createImageFromBlob(image: Blob) {
    // this.reader =

    if (image) {
      this.reader =  new FileReader();
      this.reader.readAsDataURL(image);
    }
    this.reader.addEventListener("load", () => {
      return this.reader.result;
    }, false);


  }

  onMouseMove(e){
      if (document.elementFromPoint(e.pageX, e.pageY).classList.contains('toto')){
        const url = document.elementFromPoint(e.pageX, e.pageY).getAttribute('src');
        this.imageSrc.emit(url);
      }
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

  addHttpCategory(name){
    if (name === ''){
      return;
    }
    this.galleryService.addGallery(name);
    this.galleries.add(name);
  }
}

