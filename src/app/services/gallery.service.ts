import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, first} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  apiUrl = environment.urlApi;
  constructor(private http: HttpClient) {

  }
  getGalleries() {
    return this.http.get(this.apiUrl + '/gallery');
  }

  getImage(width, height, fullPath) {
    return this.http.get(this.apiUrl + '/images/0x0/' + fullPath, {responseType: 'blob'});
  }

  addImage(file: File, category){
    const formData = new FormData();
    formData.append('file', file);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data; boundary=--boundary',
        // Authorization: 'my-auth-token'
      })
    };


    this.http.post<any>(this.apiUrl + '/gallery/' + category, formData).subscribe({
    error: err => {
      console.log('there was an error' + err);
      console.log(err);
    }
  });

}

  getImagesFromGallery(name){
    return this.http.get(this.apiUrl + '/gallery/' + name);
  }

  getCountOfImagesFromGallery(name){
    return this.http.get(this.apiUrl + '/gallery/' + name);
  }

  async addGallery(gallery){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    const galleryName = {
      name: gallery
    };

    return this.http.post<any>(this.apiUrl + '/gallery', galleryName).toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
