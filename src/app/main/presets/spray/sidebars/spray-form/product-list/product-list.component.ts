import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { PresetsService } from 'app/main/presets/presets.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { FormGroup } from '@angular/forms';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProductListComponent implements OnInit {

  dialogRef: any;

  @Input() PresetPropID: string;
  @Input() PresetID: string;
  products: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['ProductName', 'Amount', 'button'];


  // Private
  private _unsubscribeAll: Subject<any>;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  /**
   * Constructor
   *
   * @param {PresetsService} ps
   * @param {FuseSidebarService} _fuseSidebarService
   */
  constructor(
    private _matDialog: MatDialog,
    private ps: PresetsService,
    private _fuseSidebarService: FuseSidebarService
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
    this.dataSource = new FilesDataSource(this.ps);

    this.ps.onProductChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(products => {
        this.products = products;
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

  /**
     * Edit product
     *
     * @param product
     */
  editProduct(product): void {

    this.dialogRef = this._matDialog.open(ProductFormComponent, {
      panelClass: 'product-form-dialog',
      data: {
        product: product,
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

            console.log(formData.getRawValue())

            this.ps.updateProduct(formData.getRawValue(), this.PresetID);
            break;
          /**
           * Delete
           */
          case 'delete':

            this.deleteProduct(product);

            break;
        }
      });
  }



  /**
   * Delete Product
   */
  deleteProduct(product): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.ps.deleteProduct(product.ID, this.PresetID);
      }
      this.confirmDialogRef = null;
    });

  }
  /**
    * New contact
    */
  newProduct(): void {
    this.dialogRef = this._matDialog.open(ProductFormComponent, {
      panelClass: 'product-form-dialog',
      data: {
        action: 'new',
        product: {
          PresetPropID: this.PresetPropID
        }
      }
    });
    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        if (!response) {
          return;
        }

        console.log(response.getRawValue())
        this.ps.updateProduct(response.getRawValue(), this.PresetID);
      });
  }


}

export class FilesDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * @param {PresetsService} ps
   */
  constructor(
    private ps: PresetsService
  ) {
    super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    return this.ps.onProductChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }
}
