import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {DataService} from '../../data/data.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatDialogComponent} from '../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit, AfterViewChecked {
  photos;
  category;

  constructor(private router: Router,  private dialog: MatDialog, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    const pageURL = window.location.href;
    const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    console.log(lastURLSegment);
    this.category = lastURLSegment;

    this.photos = this.dataService.getPhotosToCattegory(this.category);
    console.log(this.photos);



  }
  ngAfterViewChecked(){
    if (this.photos.length === 0){
      document.getElementById('imagee').style.backgroundImage = 'url(\'assets/gallery/no-image.jpg\')';
    }else{
      const firstImage = document.getElementById('firstElement').firstElementChild.firstElementChild;
      const header = document.getElementById('imagee');
      header.style.backgroundImage = 'url(' + firstImage.src;
    }
  }

  showImage(src){
    const wrapper = document.getElementById('wrapper');
    wrapper.style.opacity = '0.5';
    const expandImg = document.getElementById('expandedImg');
    expandImg.src = src;
    expandImg.parentElement.style.display = 'block';

  }
  close(){
    const wrapper = document.getElementById('wrapper');
    wrapper.style.opacity = '1';
  }

  openAddFileDialog() {
    const dialogConfig = new MatDialogConfig();
    // this.dialog.open(MatDialogComponent, dialogConfig);
    dialogConfig.data = this.category;
    const dialogRef = this.dialog.open(MatDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
      console.log(value);
      if (value === undefined){
        this.photos = this.dataService.getPhotosToCattegory(this.category);
        return;
      }else {
        this.photos = this.dataService.getPhotosToCattegory(this.category);
        // this.addPhoto();
      }
    });
  }

// addPhoto() {
//   var photo = {
//     label: this.category,
//     icon: 'assets/gallery/pexels-photo-323780.jpeg',
//   }
//   this.dataService.addPhoto(photo);
//   this.photos = this.dataService.getPhotosToCattegory(this.category);
// }

}
