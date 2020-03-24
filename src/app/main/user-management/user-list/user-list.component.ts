import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { UserFormComponent } from 'app/main/user-management/user-form/user-form.component';
import { UserManagementService } from '../user-management.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserListComponent implements OnInit {
    @ViewChild('dialogContent', { static: false })
    dialogContent: TemplateRef<any>;


    //users: any;
    //user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['name', 'email','buttton'];
    cat1: boolean = false;
    selectedUsers: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {UsersService} ums
     * @param {MatDialog} _matDialog
     */
    constructor(
        private ums: UserManagementService,
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

        this.dataSource = new FilesDataSource(this.ums);

        this.ums.onUsersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(users => {
                //this.users = users;
                this.displayedColumns = ["name","email","buttton"];
                this.cat1 = true;
                this.checkboxes = {};
                users.map(user => {
                    this.checkboxes[user.id] = false;
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
     * Edit user
     *
     * @param user
     */
    editUser(user): void {

        this.dialogRef = this._matDialog.open(UserFormComponent, {
            panelClass: ['user-form-dialog' ],
            data: {
                user: user,
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

                        this.ums.updateUser(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteUser(user);

                        break;
                }
            });
    }

    /**
     * Delete User
     */
    deleteUser(user): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.ums.deleteUser(user);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param userId
     */
    /**
     * Toggle star
     *
     * @param userId
     */
    // toggleStar(userId): void {
    //     if (this.user.starred.includes(userId)) {
    //         this.user.starred.splice(this.user.starred.indexOf(userId), 1);
    //     }
    //     else {
    //         this.user.starred.push(userId);
    //     }

    // }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {UsersService} ums
     */
    constructor(
        private ums: UserManagementService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this.ums.onUsersChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
