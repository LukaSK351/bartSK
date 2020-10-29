import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../data/data.service';
import {Gallery} from '../../model/gallery';
import {GalleryService} from '../../services/gallery.service';
import {DomSanitizer} from '@angular/platform-browser';

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

  loading: boolean = true;

  constructor(public dataService: DataService, private galleryService: GalleryService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    if (this.gallery != undefined && this.gallery.image != undefined && this.fromCategory != true) {
      console.log("som v gallerylist")
      // console.log(this.gallery);
      this.galleryService.getImage(0, 0, this.gallery.image.fullpath).subscribe(data => {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          this.loading = false;
          this.image = reader.result;
        });

        if (data) {
          reader.readAsDataURL(data);
        }
      });
      this.galleryService.getCountOfImagesFromGallery(this.gallery.path).subscribe(gallery => {
        console.log(gallery.images)
        this.numberOfImages = gallery.images.length;
      })
    }
    else if (this.fromCategory == true){

      this.galleryService.getImage(0, 0, this.imagesInGallery.fullpath).subscribe(data => {
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
    const wrapper = document.getElementById('wrapper');
    wrapper.style.opacity = '0.5';
    const expandImg = document.getElementById('expandedImg');
    expandImg.setAttribute('src', src);
    expandImg.parentElement.style.display = 'block';

  }
  onMouseMove(e){
    if (document.elementFromPoint(e.pageX, e.pageY).classList.contains('toto')){
      const url = document.elementFromPoint(e.pageX, e.pageY).getAttribute('src');
      this.imageSrc.emit(url);
      console.log(url)
    }
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
