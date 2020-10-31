import {AfterViewChecked, Component, HostListener, Input, OnInit} from '@angular/core';
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
  getElement = document.getElementById;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.close();
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // right
    if (event.keyCode === 39) {
      this.nextImage();
    }
    // left
    if (event.keyCode === 37) {
      this.previousImage();
    }
  }
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
      const firstImage = document.getElementById('0');
      const header = document.getElementById('imagee');
      const srcfirstImage = firstImage.src.split('/')[firstImage.src.split('/').length - 1];
      if (srcfirstImage !== 'loading.svg') {
        header.style.backgroundImage = 'url(' + firstImage.getAttribute('src');
        this.url = firstImage.getAttribute('src');
      }
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
    document.getElementById('overlay').style.display = 'none';
  }

  openAddFileDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.category;
    dialogConfig.height = '400px';
    const dialogRef = this.dialog.open(MatDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value === undefined){
        return;
      }else {

        if (value.length > 1) {
          setTimeout(() => {
            for (let i = 0;  i < value.length; i++){

              const imageType = value[i].name.split('.').pop();
              let jpegToJpg;

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
          let jpegToJpg;

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
  nextImage(){
    const expandImg = document.getElementById('expandedImg');
    let nextElementId = parseInt(expandImg.getAttribute('alt'), 10) + 1;
    const nextImage = document.getElementById(nextElementId.toString());
    if (nextImage == null){
      return;
    }
    expandImg.setAttribute('src', nextImage.getAttribute('src'));
    expandImg.setAttribute('alt', nextElementId.toString());

  }
  previousImage(){
    const expandImg = document.getElementById('expandedImg');
    let previousElementId = parseInt(expandImg.getAttribute('alt'), 10) - 1;
    const previousImage = document.getElementById(previousElementId.toString());
    if (previousImage == null){
      return;
    }
    expandImg.setAttribute('src', previousImage.getAttribute('src'));
    expandImg.setAttribute('alt', previousElementId.toString());
  }
}
