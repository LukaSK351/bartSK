import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../data/data.service';
import {Gallery} from '../../model/gallery';
import {GalleryService} from '../../services/gallery.service';
import {DomSanitizer} from '@angular/platform-browser';
import {take} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatDialogComponent} from '../mat-dialog/mat-dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-the-image',
  templateUrl: './the-image.component.html',
  styleUrls: ['./the-image.component.scss']
})
export class TheImageComponent implements OnInit {
  @Input() gallery;
  @Output() imageSrc = new EventEmitter<string>();
  @Input() fromCategory: boolean;
  image;
  @Input() category: boolean;
  @Input() imagesInGallery;
  numberOfImages: number;
  @Input() indexOfImage;
  loading = true;
  @Output() deleteGalleryName = new EventEmitter<string>();

  constructor(private dialog: MatDialog, public dataService: DataService,
              private galleryService: GalleryService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    if (this.gallery !== undefined && this.gallery.image !== undefined && this.fromCategory !== true) {
      this.galleryService.getImage(300, 0, this.gallery.image.fullpath).subscribe(data => {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          this.loading = false;
          this.image = reader.result;
          this.dataService.currentImage.pipe(take(1)).subscribe(img => {
            if (img === 'empty'){
              this.imageSrc.emit(this.image);
              this.dataService.changeHeaderImg(this.image);
            }
          });
        });

        if (data) {
          reader.readAsDataURL(data);
        }
      });
      this.galleryService.getCountOfImagesFromGallery(this.gallery.path).subscribe(gallery => {
        // @ts-ignore
        this.numberOfImages = gallery.images.length;
      });
    }
    else if (this.fromCategory === true){

      this.galleryService.getImage(700, 0, this.imagesInGallery.fullpath).subscribe(data => {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            this.loading = false;
            this.image = reader.result;
          });

          if (data) {
            reader.readAsDataURL(data);
          }
        });
    }

    else{
      this.loading = false;
      this.image = 'assets/gallery/no-image.jpg';
    }
  }

  deleteGallery(){
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.width = '35em';
      const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(value => {
        if (value === 'delete'){
          this.galleryService.deleteGallery(this.gallery.path).subscribe(response => {
            console.log(response);
            // @ts-ignore
            if (response.status === 'ok'){
                this.deleteGalleryName.emit(this.gallery.path);
            }
          });
        }else {
            return;
        }
      });


    // this.galleryService.deleteGallery(this.gallery.path).subscribe(response => {
    //   console.log(response);
    //   if (response.status === 'ok'){
    //       this.deleteGalleryName.emit(this.gallery.path);
    //   }
    // });
  }

  showImage(src){
    const expandImg = document.getElementById('expandedImg');
    expandImg.setAttribute('src', src);
    expandImg.setAttribute('alt', this.indexOfImage);
    document.getElementById('overlay').style.display = 'flex';
  }

  onMouseMove(){
    this.dataService.changeHeaderImg(this.image);
  }

  declension(){
    if (this.numberOfImages === undefined){
      return '0 fotiek';
    }
    if (this.numberOfImages === 1){
      return 'fotka';
    }
    else if (this.numberOfImages === 2 || this.numberOfImages === 3 || this.numberOfImages === 4 ){
      return 'fotky';
    }else{
      return 'fotiek';
    }
  }

}
