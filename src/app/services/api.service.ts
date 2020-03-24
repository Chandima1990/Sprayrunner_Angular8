import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from "environments/environment";
import { APIheader } from 'app/models/APIheader';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private httpClient: HttpClient, private progressBarService: FuseProgressBarService, public _snackBar: MatSnackBar) { }

  /**
   * API call fot get requests
   * @param url 
   * @param headerList 
   * @param data 
   */
  public get(url: string, headers: HttpHeaders, data: string): Observable<any> {
    /**
     * start progress bar showing for loading 
     * */
    this.progressBarService.show();
    return this.httpClient.get(url + data, { headers }).pipe(
      retry(3), catchError(this.handleError), tap(res => {

        //stoping the progress bar
        this.progressBarService.hide();
      }, error => {
        this.progressBarService.hide();
        console.log(error);
      }))
  }

  /**
   * API call for POST requests
   * @param url 
   * @param data 
   * @param headerList 
   */
  post(url: string, data: any, headers: HttpHeaders): Observable<any> {
    //start progress bar showing for loading
    this.progressBarService.show();

    return this.httpClient.post(url, data, { headers }).pipe(catchError(this.handleError), tap(res => {

      //Common snackbar msgs
      if (res.status != undefined) {
        this._snackBar.open(res.status + "!", "Close", {
          duration: 8000,
        });
      }
      //stoping progress bar showing for loading
      this.progressBarService.hide();

    }, error => {
      this.progressBarService.hide();
      console.log(error);
    }))
  }
  /**
   * API call for Delete requests
   * @param url 
   * @param data 
   * @param headerList 
   */
  delete(url: string, body: any, headers: HttpHeaders): Observable<any> {
    //start progress bar showing for loading
    this.progressBarService.show();

    return this.httpClient.request('delete', url, { body, headers }).pipe(catchError(this.handleError), tap(res => {

      //Common snackbar msgs
      if (res.status != undefined) {
        this._snackBar.open(res.status + "!", "Close", {
          duration: 8000,
        });
      }

      //stoping progress bar showing for loading
      this.progressBarService.hide();

    }, error => {
      this.progressBarService.hide();
      console.log(error);
    }))
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.

      console.log(error)
      // this._snackBar.open(error.error.message + "!", "Close", {
      //   duration: 8000,
      // });
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(error)

      // this._snackBar.open(error.error.status + "!", "Close", {
      //   duration: 8000,
      // });
    }
    // return an observable with a user-facing error message
    console.log(error)
    return throwError(
      'Something bad happened; please try again later.');
  };
}