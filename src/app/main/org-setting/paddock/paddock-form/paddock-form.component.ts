import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Paddock } from 'app/models/paddock';
import { OrgSettingService } from 'app/main/org-setting/org-setting.service';

@Component({
  selector: 'paddocks-paddock-form-dialog',
  templateUrl: './paddock-form.component.html',
  styleUrls: ['./paddock-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PaddockFormComponent {

  selected: any;
  action: string;
  paddock: Paddock;
  paddockForm: FormGroup;
  dialogTitle: string;

  /**
   * Constructor
   *
   * @param {MatDialogRef<PaddockFormComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    public matDialogRef: MatDialogRef<PaddockFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private os: OrgSettingService,
  ) {
    // Set the defaults
    this.action = _data.action;

    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Paddock';
      this.paddock = _data.paddock;
    }
    else {
      this.dialogTitle = 'New Paddock';
      this.paddock = new Paddock({});
    }

    // this.selected = new FormControl(this.paddock.parameter, [
    // ]);
    this.paddockForm = this.createPaddockForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create paddock form
   *
   * @returns {FormGroup}
   */
  createPaddockForm(): FormGroup {

    return this._formBuilder.group({
      name: [this.paddock.name],
      area: [this.paddock.area],
      parameter: new FormControl(this.paddock.parameter),
      Id: [this.paddock.Id || ""],
      SprayPropertySettingsId: [this.os.SprayProperty[0].Id],
    });
  }
}
