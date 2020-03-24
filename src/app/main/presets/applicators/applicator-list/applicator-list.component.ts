import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PresetsService } from '../../presets.service';
import { DataSource } from '@angular/cdk/table';
import { Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { takeUntil } from 'rxjs/operators';
import { ApplicatorFormComponent } from '../applicator-form/applicator-form.component';
import { FormGroup } from '@angular/forms';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Applicator } from '../applicator';

@Component({
  selector: 'app-applicator-list',
  templateUrl: './applicator-list.component.html',
  styleUrls: ['./applicator-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ApplicatorListComponent implements OnInit {

  dataSource: FilesDataSource | null;
  displayedColumns = ['username', 'buttton'];

  //applicators: Applicator[]
  // Private
  private _unsubscribeAll: Subject<any>;

  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(
    private ps: PresetsService,
    public _matDialog: MatDialog
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  /**
   * On init
   */
  ngOnInit(): void {

    this.dataSource = new FilesDataSource(this.ps);

    this.ps.onApplicatorsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(applicators => {
        //this.applicators = applicators


        applicators.map(applicator => {

        });
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Edit applicator
   *
   * @param applicator
   */
  editApplicator(applicator): void {

    this.dialogRef = this._matDialog.open(ApplicatorFormComponent, {
      panelClass: ['applicator-form-dialog'],
      data: {
        applicator: applicator,
        action: 'edit'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        const actionType: string = response[0];
        const formData: FormGroup = response[1];
        switch (actionType) {
          /**
           * Save
           */
          case 'save':

            this.ps.updateApplicator(formData.getRawValue());
            console.log(formData.getRawValue())
            break;
          /**
           * Delete
           */
          case 'delete':

            this.deleteApplicator(applicator);

            break;
        }
      });
  }

  /**
   * Delete Applicator
   */
  deleteApplicator(applicator): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ps.deleteApplicator(applicator);
      }
      this.confirmDialogRef = null;
    });

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

export class FilesDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * @param {ApplicatorsService} ps
   */
  constructor(
    private ps: PresetsService
  ) {
    super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    return this.ps.onApplicatorsChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }
}
