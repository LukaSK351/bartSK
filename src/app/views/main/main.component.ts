import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../data/data.service';
import {Gallery} from '../../model/gallery';
import {MatDialogComponent} from '../../components/mat-dialog/mat-dialog.component';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {GalleryService} from '../../services/gallery.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],


})
export class MainComponent implements OnInit {
  @Output() imageSrc = new EventEmitter<string>();


  galleries: Gallery[];
  galleries2;
  isOpen  = true;

    constructor(private dataService: DataService, private dialog: MatDialog, private galleryService: GalleryService) { }


  ngOnInit(): void {
    this.galleries = this.dataService.galleries();
    // this.galleryService.getGalleries().subscribe(gallery => {
    //   this.galleries2 = gallery.galleries;
    //   console.log(this.galleries2)
    // });

    // var firstImage = document.getElementById('firstMan').firstElementChild.firstElementChild.getAttribute('src');
    // this.imageSrc.emit(firstImage);

  }

  onMouseMove(e){
      if (document.elementFromPoint(e.pageX, e.pageY).classList.contains('toto')){
        const url = document.elementFromPoint(e.pageX, e.pageY).getAttribute('src');
        this.imageSrc.emit(url);
      }

  }
  onMouseLeave(e){
      // this.isOpen = true
  }

  ngDoCheck(){
    if (this.galleries.length == 0){
      const header = document.getElementById('imagee');
      header.style.backgroundImage = "url('assets/gallery/no-image.jpg')";
    }else{

// console.log('pro')
      // console.log(firstImage);
      // setTimeout(() => {
      // }, 200);

    }
  }


  openAddFileDialog() {
    const dialogConfig = new MatDialogConfig();
    // this.dialog.open(MatDialogComponent, dialogConfig);
    dialogConfig.width = '23em';
    let dialogRef = this.dialog.open(MatDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
      console.log(value);
      if (value == undefined){
        return;
      }else {
        this.addCategory(value);
      }

    });

  }

  // openDialog(): void {
  //   this.dialog.open(MatDialogComponent,{
  //     data:{
  //       message: 'Are you sure want to delete?',
  //       buttonText: {
  //         ok: 'Save',
  //         cancel: 'No'
  //       }
  //     }
  //   });
  // }

  addCategory(name){
    var newCategory = {
      label: name,
        icon: 'assets/gallery/no-image.jpg',
    }
    this.dataService.addCategory(newCategory);
    // this.galleryService.addGallery();

  }

}

