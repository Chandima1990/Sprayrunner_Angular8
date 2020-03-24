import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { PaddockFormComponent } from 'app/main/org-setting/paddock/paddock-form/paddock-form.component';
import { OrgSettingService } from 'app/main/org-setting/org-setting.service';

@Component({
    selector: 'app-paddock-list',
    templateUrl: './paddock-list.component.html',
    styleUrls: ['./paddock-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaddockListComponent implements OnInit {
    @ViewChild('dialogContent', { static: false })
    dialogContent: TemplateRef<any>;


    paddocks: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['name', 'area','button'];
    selectedPaddocks: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {PaddocksService} os
     * @param {MatDialog} _matDialog
     */
    constructor(
        private os: OrgSettingService,
        public _matDialog: MatDialog,
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
        //this.os.getPaddocks(this.SpraypropertyData[0][0].Id);

        this.dataSource = new FilesDataSource(this.os);

        this.os.onPaddocksChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(paddocks => {
                this.paddocks = paddocks;
                paddocks.forEach(element => {
                    element["SprayPropertySettingsId"] = this.os.SprayProperty[0].Id
                });
                
                this.checkboxes = {};
                paddocks.map(paddock => {
                    this.checkboxes[paddock.id] = false;
                });
            });

        this.os.onSelectedPaddocksChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedPaddocks => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedPaddocks.includes(id);
                }
                this.selectedPaddocks = selectedPaddocks;
            });

        //   this.os.onUserDataChanged
        //       .pipe(takeUntil(this._unsubscribeAll))
        //       .subscribe(user => {
        //           this.user = user;
        //       });

        this.os.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.os.deselectPaddocks();
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
     * Edit paddock
     *
     * @param paddock
     */
    editPaddock(paddock): void {
        this.dialogRef = this._matDialog.open(PaddockFormComponent, {
            panelClass: 'paddock-form-dialog',
            data: {
                paddock: paddock,
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

                        this.os.updatePaddock(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deletePaddock(paddock);

                        break;
                }
            });
    }

    /**
     * Delete Paddock
     */
    deletePaddock(paddock): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.os.deletePaddock(paddock);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param paddockId
     */
    onSelectedChange(paddockId): void {
        this.os.toggleSelectedPaddock(paddockId);
    }

    /**
     * Toggle star
     *
     * @param paddockId
     */
    toggleStar(paddockId): void {
        if (this.user.starred.includes(paddockId)) {
            this.user.starred.splice(this.user.starred.indexOf(paddockId), 1);
        }
        else {
            this.user.starred.push(paddockId);
        }

        // this.os.updateUserData(this.user);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {OrgSettingService} os
     */
    constructor(
        private os: OrgSettingService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this.os.onPaddocksChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
