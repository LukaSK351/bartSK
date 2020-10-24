import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {DataService} from '../../data/data.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatDialogComponent} from '../mat-dialog/mat-dialog.component';
import {GalleryService} from '../../services/gallery.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit, AfterViewChecked {
  photos;
  category;
  url;

  constructor(private router: Router, private galleryService: GalleryService,
              private dialog: MatDialog, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    const pageURL = window.location.href;
    const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    this.category = lastURLSegment;
    this.photos = this.dataService.getPhotosToCattegory(this.category);
    this.galleryService.getImagesFromGallery(this.category).subscribe(images => {
      this.photos = images;
      this.photos = this.photos.images;
    });
  }

  ngAfterViewChecked(){
    if (this.photos.length === 0){
      document.getElementById('imagee').style.backgroundImage = 'url(\'assets/gallery/no-image.jpg\')';
    }else{
      const firstImage = document.getElementById('firstElement').firstElementChild.firstElementChild.firstElementChild.firstElementChild;
      const header = document.getElementById('imagee');
      header.style.backgroundImage = 'url(' + firstImage.getAttribute('src');
      this.url = firstImage.getAttribute('src');
    }
  }

  readImageFromAssets(image){
  return './assets/gallery/' + image.path;
  }

  showImage(src){
    const wrapper = document.getElementById('wrapper');
    wrapper.style.opacity = '0.5';
    const expandImg = document.getElementById('expandedImg');
    expandImg.setAttribute('src', './assets/gallery/' + src);
    expandImg.parentElement.style.display = 'block';
  }

  close(){
    const wrapper = document.getElementById('wrapper');
    wrapper.style.opacity = '1';
  }

  openAddFileDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.category;
    const dialogRef = this.dialog.open(MatDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value === undefined){
        return;
      }else {

        if (value.length > 1) {
          setTimeout(() => {
            for (let i = 0;  i < value.length; i++){

              const imageType = value[i].name.split('.').pop();
              var jpegToJpg;

              if (imageType === 'jpeg'){
                jpegToJpg = value[i].name.slice(0, -4);
                jpegToJpg = jpegToJpg + 'jpg';
              }else{
                jpegToJpg = value[i].name;
              }

              const image = {
                path: value[i].name ,
                fullpath: this.category + '/' + jpegToJpg,
              };
              this.photos.push(image);
            }
          }, 2000);


        }else{
          const imageType = value[0].name.split('.').pop();
          var jpegToJpg;

          if (imageType === 'jpeg'){
            jpegToJpg = value[0].name.slice(0, -4);
            jpegToJpg = jpegToJpg + 'jpg';
          }else{
            jpegToJpg = value[0].name;
          }

          const image = {
            path: value[0].name ,
            fullpath: this.category + '/' + jpegToJpg,
          };
          setTimeout(() => {
            this.photos.push(image);
          }, 2000);
        }
      }
    });
  }
}
