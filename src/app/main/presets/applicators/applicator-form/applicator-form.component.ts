import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Applicator } from '../applicator';

import { UserManagementService } from 'app/main/user-management/user-management.service';
import { User } from 'app/models/User';
import { DropdownList } from 'app/models/dropdownlist';

@Component({
  selector: 'applicator-form-dialog',
  templateUrl: './applicator-form.component.html',
  styleUrls: ['./applicator-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ApplicatorFormComponent implements OnInit {

  selected: any;
  action: string;
  applicator: Applicator;
  users: DropdownList[];
  applicatorForm: FormGroup;
  dialogTitle: string;

  /**
   * Constructor
   *
   * @param {MatDialogRef<ApplicatorFormComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    public matDialogRef: MatDialogRef<ApplicatorFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    
    private ums: UserManagementService,
  ) {
    // Set the defaults
    this.action = _data.action;

    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Applicator';
      this.applicator = _data.applicator;
      
    }
    else {
      this.dialogTitle = 'New Applicator';
      this.applicator = new Applicator({});
    }

    // this.selected = new FormControl(this.applicator.parameter, [
    // ]);
    this.applicatorForm = this.createApplicatorForm();
  }

  ngOnInit(): void {
    this.users = this.ums.users.map(user => {
      return {
        label: user.FirstName + " " + user.LastName,
        value: user.ID
      }
    });
    
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create applicator form
   *
   * @returns {FormGroup}
   */
  createApplicatorForm(): FormGroup {
    console.log({ID: this.applicator.userrid, Name: this.applicator.username})
    return this._formBuilder.group({
      Id: [this.applicator.Id],
      user: new FormControl(this.applicator.userrid),
    });
  }
}
