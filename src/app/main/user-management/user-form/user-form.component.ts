import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { User } from 'app/models/user';
import { OrgSettingService } from 'app/main/org-setting/org-setting.service';

@Component({
  selector: 'user-form-dialog',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UserFormComponent {

  selected: any;
  action: string;
  user: User;
  userForm: FormGroup;
  dialogTitle: string;

  /**
   * Constructor
   *
   * @param {MatDialogRef<UserFormComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    public matDialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private os: OrgSettingService,
  ) {
    // Set the defaults
    this.action = _data.action;

    if (this.action === 'edit') {
      this.dialogTitle = 'Edit User';
      this.user = _data.user;
    }
    else {
      this.dialogTitle = 'New User';
      this.user = new User({});
    }

    // this.selected = new FormControl(this.user.parameter, [
    // ]);
    this.userForm = this.createUserForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create user form
   *
   * @returns {FormGroup}
   */
  createUserForm(): FormGroup {
    return this._formBuilder.group({
      firstname: [this.user.FirstName],
      lastname: [this.user.LastName],
      email: [this.user.Email],
      password: [this.user.ConPassword],
      ID: [this.user.ID || ""],
    });
  }
}
