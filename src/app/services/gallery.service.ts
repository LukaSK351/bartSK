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
    return this.http.get(this.apiUrl + '/images/' + width + 'x' + height + '/' +  fullPath, {responseType: 'blob'});
  }

  addImage(file: File, category){
    const formData = new FormData();
    formData.append('file', file);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data; boundary=--boundary',
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

  deleteGallery(galleryName: string){
    const url = this.apiUrl + '/gallery/' + galleryName;
    return this.http.delete(url).pipe();

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
