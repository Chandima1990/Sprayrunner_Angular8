import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserManagementService } from './user-management.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { fuseAnimations } from '@fuse/animations';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserManagementComponent implements OnInit {


  dialogRef: any;
  private _unsubscribeAll: Subject<any>;
  PageHeader: string;
  constructor(private ums: UserManagementService,
    private cs: CommonService,
    private _matDialog: MatDialog) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.PageHeader = "User Management";
    this.getUsers()
  }
  /**
       * On destroy
       */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getUsers() {

  }



  /**
   * New contact
   */
  newUser(): void {
    this.dialogRef = this._matDialog.open(UserFormComponent, {
      panelClass: 'user-form-dialog',
      data: {
        action: 'new'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        if (!response) {
          return;
        }

        this.ums.updateUser(response.getRawValue());
      });
  }

}
