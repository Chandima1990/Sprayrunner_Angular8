import { Component, OnDestroy, OnInit, Inject, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { PresetsService } from 'app/main/presets/presets.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DropdownList } from 'app/models/dropdownlist';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';





@Component({
  selector: 'spray-form-sidebar',
  templateUrl: './spray-form.component.html',
  styleUrls: ['./spray-form.component.scss'],
  animations: fuseAnimations
})
export class SprayFormComponent implements OnInit, OnDestroy {
  selected: any;
  propertyForm: FormGroup;

  @Input() PresetPropID: string;
  @Input() PresetID: string;

  crops: DropdownList[] = [];
  paddocks: DropdownList[] = [];
  area: string = "";
  ID: string = "";
  speed: string = "";
  // Private
  private _unsubscribeAll: Subject<any>;


  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  /**
   * Constructor
   *
   * @param {PresetsService} ps
   */
  constructor(
    private _matDialog: MatDialog,
    private ps: PresetsService,
    private _formBuilder: FormBuilder,
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

    this.propertyForm = this._formBuilder.group({
      ID: ['', Validators.required],
      PresetID: [this.PresetID, Validators.required],
      area: ['', Validators.required],
      speed: ['', Validators.required],
      paddock: [new FormControl(), Validators.required],
      crop: [new FormControl(), Validators.required],
    });

    this.ps.onSpraySelected
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selected => {
        this.crops = []
        this.paddocks = []

        this.selected = selected;
        if (this.ps.properties !== undefined) {
          this.ps.properties.Paddocks.forEach((element) => {
            this.paddocks.push({ label: element.Paddocks, value: element.PaddocksId });
          })
          
        }
        this.PresetPropID = selected.ID
        this.PresetID = selected.PresetID
        console.log(selected)
        this.ps.crops[0].filter((d) => {
          return d.isSelected
        }).forEach((element) => {
          this.crops.push({ label: element.Name, value: element.Id });
        })


        this.propertyForm.get('speed').setValue(selected.TravelSpeed)
        this.propertyForm.get('ID').setValue(selected.ID || "")
        this.propertyForm.get('paddock').setValue(selected.PaddockID)

        this.propertyForm.get('crop').setValue(selected.CropID)
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

  CropChanged(event) {
    console.log(event)
    //this.ps.getSprayPresetsPropertiesProducts(event.value);
  }
  deleteSpray() {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ps.deleteSprayPresetsProperties(this.selected.ID, this.PresetID);
      }
      this.confirmDialogRef = null;
    });
  }

  SubmitProperty() {

    let obj = Object();

    obj.AreaTreated = '180';
    obj.Id = this.propertyForm.get('ID').value;
    obj.PresetID = this.PresetID;
    obj.PaddockID = this.propertyForm.get('paddock').value;
    obj.CropID = this.propertyForm.get('crop').value;
    obj.AreaTreatedParameter = "";
    obj.TravelSpeed = this.propertyForm.get('speed').value;
    obj.ProductList = new Array();

    console.log(obj)

    this.ps.updateSpray(obj);
  }


  
  dialogRef: any;
  // /**
  //  * New contact
  //  */
  // newApplicator(): void {
  //   this.dialogRef = this._matDialog.open(ProductFormComponent, {
  //     panelClass: 'product-form-dialog',
  //     data: {
  //       action: 'new'
  //     }
  //   });

  //   this.dialogRef.afterClosed()
  //     .subscribe((response: FormGroup) => {
  //       if (!response) {
  //         return;
  //       }

  //       this.ps.updateApplicator(response.getRawValue());
  //     });
  // }
}
