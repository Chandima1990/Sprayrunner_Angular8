import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PresetsService } from './presets.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpraypresetList } from 'app/models/dropdownlist-spraypresets';
import { DropdownList } from 'app/models/dropdownlist';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PresetsComponent implements OnInit {
  @Input() selectedIndex = new FormControl(0);
  @Input() presetForm: FormGroup;
  presetDDForm: FormGroup;
  presets: SpraypresetList[] = [];
  paddocks: DropdownList[] = [];
  presetName: string = "";

  deleteBtn = false;

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  private _unsubscribeAll: Subject<any>;

  @Input() preset = new SpraypresetList();
  constructor(private ps: PresetsService,
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder) {


    // Set the private defaults
    this._unsubscribeAll = new Subject();

  }

  ngOnInit(): void {

    this.presetForm = this._formBuilder.group({
      ID: ['', Validators.required],
      presetName: [this.presetName, Validators.required],
      brand_model: new FormControl(),
      brand_size: new FormControl(),
      target_pressure: new FormControl(),
    });
    this.presetDDForm = this._formBuilder.group({
      preset: [new FormControl(), Validators.required]
    });

    this.ps.onPresetChanged.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.presets = []
        data.forEach((item) => {
          this.presets.push({ label: item.name, value: item.Id, NozzlePressureId: item.NozzlePressureId, brandmodelId: item.brandmodelId, NozzleSizesId: item.NozzleSizesId });
        });
        //this.presetForm.get("presetName").setValue(this.preset.label)

        this.preset = this.presets.filter((d) => {
          return d.value === this.preset.value;
        })[0];

        this.presetDDForm.get("preset").setValue(this.preset || this.presets[0]);
        this.PresetSelected({ value: this.preset || this.presets[0] })
      });

  }

  newPreset() {
    this.selectedIndex.setValue(1);
    this.presetForm.get("ID").setValue("")
    this.presetForm.get("presetName").setValue("")
    this.presetForm.get("brand_model").setValue("")
    this.presetForm.get("brand_size").setValue("")
    this.presetForm.get("target_pressure").setValue("")
    this.preset = new SpraypresetList();

  }
  /**
   * tab change helper
   */
  // private goToNextTabIndex(tabGroup: MatTabGroup) {
  //   if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;

  //   const tabCount = tabGroup._tabs.length;
  //   tabGroup.selectedIndex = (tabGroup.selectedIndex + 1) % tabCount;
  // }

  PresetSelected(event) {
    this.presetForm.get("ID").setValue(event.value.value)
    this.presetForm.get("presetName").setValue(event.value.label)
    this.presetForm.get("brand_model").setValue(event.value.brandmodelId)
    this.presetForm.get("brand_size").setValue(event.value.NozzleSizesId)
    this.presetForm.get("target_pressure").setValue(event.value.NozzlePressureId)
    this.ps.getSprayPresetsProperties(event.value.value);
    this.preset = event.value;

    if (event.value !== undefined) {
      this.deleteBtn = true;
    } else {
      this.deleteBtn = false;
    }

  }
  DeletePreset() {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ps.DeleteSprayPresets(this.preset.value).then((d: any) => {
          if (d.Code) {
            this.deleteBtn = false;
            this.presetForm.get("ID").setValue("")
            this.presetForm.get("presetName").setValue("")
            this.presetForm.get("brand_model").setValue("")
            this.presetForm.get("brand_size").setValue("")
            this.presetForm.get("target_pressure").setValue("")
          }
        });
      }
      this.confirmDialogRef = null;
    });

  }

}
