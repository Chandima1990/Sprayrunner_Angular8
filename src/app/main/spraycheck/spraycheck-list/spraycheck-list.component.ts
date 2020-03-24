import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { SpraycheckService } from '../spraycheck.service';

@Component({
    selector: 'app-spraycheck-list',
    templateUrl: './spraycheck-list.component.html',
    styleUrls: ['./spraycheck-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SpraycheckListComponent implements OnInit {

    dataSource: FilesDataSource | null;
    displayedColumns = [];
    @Input() Rating: string = "";
    Date: string = "";

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {SpraychecksService} scs
     * @param {MatDialog} _matDialog
     */
    constructor(
        private scs: SpraycheckService,
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
        this.scs.onHeaderChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe((d) => {
            this.displayedColumns = d;
        })
        
        this.dataSource = new FilesDataSource(this.scs);

        var dt = new Date();
        var date = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();

        this.Date = date;

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

}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {SpraychecksService} scs
     */
    constructor(
        private scs: SpraycheckService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this.scs.onSpraychecksChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
