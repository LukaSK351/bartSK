import { Injectable } from '@angular/core';
import {Gallery} from '../model/gallery';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private imageSource = new BehaviorSubject<string>('empty');
  currentImage = this.imageSource.asObservable();

  constructor() { }

  changeHeaderImg(message: any) {
    this.imageSource.next(message);
  }




}
