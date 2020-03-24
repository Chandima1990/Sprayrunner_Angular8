import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, generate } from 'rxjs';


import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { fuseAnimations } from '@fuse/animations';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { KeyService } from 'app/services/key.service';
import { UserAccountService } from 'app/services/user-account.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/models/User';



@Component({
  selector: 'app-account-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SettingsComponent implements OnInit, OnDestroy {

  updatePassword: FormGroup;
  updateEmail: FormGroup;
  changeTFA: FormGroup;

  Password: string;
  NewPassword: string;
  ConfirmPassword: string;
  Email: string;
  ConfirmEmail: string;

  isChecked = true;

  UserData: User;


  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   * @param {FormBuilder} _formBuilder
   * @param {ProfileService} _profileService
   */
  constructor(
    private _formBuilder: FormBuilder,
    private ks: KeyService,
    private uas: UserAccountService,
    private _snackBar: MatSnackBar
    //private _profileService: ProfileService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    this.uas.onUserChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      
      this.UserData = data;
      this.Email = this.UserData.Email;
    
    })

    this.changeTFA = this._formBuilder.group({
      TFAStatus: [this.UserData.TFA, Validators.required],
    });

    this.updatePassword = this._formBuilder.group({
      Password: ['', Validators.required],
      NewPassword: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    });

    this.updateEmail = this._formBuilder.group({
      Password: ['', Validators.required],
      ConfirmEmail: ['', [Validators.required, Validators.email]]
    });

    this.changeTFA = this._formBuilder.group({
      TFAStatus: [false, Validators.required],
    });

  }

  UpdatePassword() {
    this.uas.UpdatePassword("pass", this.Email, this.Password, this.NewPassword, this.ConfirmPassword);
  }
  UpdateEmail() {
    this.uas.UpdateEmail("user", this.ConfirmEmail, this.Password, this.ConfirmEmail);
  }

  ChangeTFA(formValue: any) {
    let TFAStatus = formValue.TFAStatus;
    let TFA: string;

    if (TFAStatus) {
      TFA = "";
    } else {
      TFA = "mail"
    }
    this.uas.ChangeTFA(this.ks.userid, this.UserData.FirstName, this.UserData.LastName, this.UserData.Email, "", this.UserData.gender, "01/01/1900", "0", "0", TFA, "api/save/v1.0.0/AccountAdd");
  }


  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar() {
    this._snackBar.open('Canonball!!', 'End now', {
      duration: 500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
