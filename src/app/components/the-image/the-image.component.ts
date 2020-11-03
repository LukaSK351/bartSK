import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../data/data.service';
import {Gallery} from '../../model/gallery';
import {GalleryService} from '../../services/gallery.service';
import {DomSanitizer} from '@angular/platform-browser';
import {take} from 'rxjs/operators';

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

  constructor(public dataService: DataService, private galleryService: GalleryService, private sanitizer: DomSanitizer) { }

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
