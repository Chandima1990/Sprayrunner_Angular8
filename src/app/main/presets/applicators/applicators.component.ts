import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup } from '@angular/forms';
import { PresetsService } from '../presets.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ApplicatorFormComponent } from './applicator-form/applicator-form.component';

@Component({
  selector: 'app-applicators',
  templateUrl: './applicators.component.html',
  styleUrls: ['./applicators.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ApplicatorsComponent implements OnInit {

  dialogRef: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(private ps: PresetsService,
    private _matDialog: MatDialog) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  /**
       * On destroy
       */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * New contact
   */
  newApplicator(): void {
    this.dialogRef = this._matDialog.open(ApplicatorFormComponent, {
      panelClass: 'applicator-form-dialog',
      data: {
        action: 'new'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        if (!response) {
          return;
        }

        this.ps.updateApplicator(response.getRawValue());
      });
  }

}
