import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) {

  }

  getGalleries() {
    return this.http.get('http://api.programator.sk/gallery');
  }



  addGallery(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };


    var gallery = {
      path: 'testit',
      image: {
        path: 'obr.jpg',
        fullpath: 'kategoria/grey.jpg',
        name: 'grey',
        modified: '2020-08-13T10:38:30.0+0200'
      },
      name: 'ludze'
    };
    return this.http.post('http://api.programator.sk/gallery', gallery)
      .pipe(
        // catchError(this.handleError('addHero', gallery))
      );
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
