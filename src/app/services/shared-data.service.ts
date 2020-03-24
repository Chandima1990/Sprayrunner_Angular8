import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
 * This Service is used for the common functionalities used across the app 
 */
export class SharedDataService {
  sprayrunForm: BehaviorSubject<any>;
  currentSprayrunForm: any;
  _unsubscribeAll: Subject<any>;
  constructor() {
    this.sprayrunForm = new BehaviorSubject([]);
    this._unsubscribeAll = new Subject();
  }

  /**
   * This is to manage the sprayrun details filled by  the user to get it from the next step of the sprayrun page
   * @param form the sprayrun form filled in the first step of the sprayrun page.
   */
  changeSprayrunnerForm(form: any) {
    this.sprayrunForm.next(form);
    this.sprayrunForm.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      this.currentSprayrunForm = data;
    })
  }
}
