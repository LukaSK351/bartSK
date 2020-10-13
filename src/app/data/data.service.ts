import { Injectable } from '@angular/core';
import {Gallery} from '../model/gallery';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  katerogie: Gallery[] = [
    {
      label: 'Priroda',
      icon: 'assets/gallery/pexels-photo-261187.jpeg',
    },
    {
      label: 'Ludia',
      icon: 'assets/gallery/no-image.jpg',
    },
    {
      label: 'Jedlo',
      icon: 'assets/gallery/no-image.jpg',
    }
  ];

  photos = [
    {
      label: 'Priroda',
      icon: 'assets/gallery/pexels-photo-261187.jpeg',
    },
    {
      label: 'ludia',
      icon: 'assets/gallery/pexels-photo-323780.jpeg',
    },
    {
      label: 'Priroda',
      icon: 'assets/gallery/pexels-photo-27411.jpg',
    }
  ];

  constructor() { }

  galleries(): Gallery[]{
    return this.katerogie;
  }

  addCategory(newCategory){
    this.katerogie.push(newCategory);
  }

  getPhotosToCattegoryCount(label){
    let count = 0;
    this.photos.forEach(photo => {
      if (photo.label === label){
        count ++;
        }
    });
    return count;
  }

  addPhoto(newPhoto){
    this.photos.splice(0, 0, newPhoto);
  }

  getPhotosToCattegory(cattegory) {
    const zvysok =  this.photos.filter(picture => picture.label === cattegory
  );
    return zvysok;
}
}
