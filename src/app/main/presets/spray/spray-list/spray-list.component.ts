import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { PresetsService } from '../../presets.service';
import { SprayPresetProduct } from 'app/fake-db/spray-preset-product';



@Component({
    selector     : 'app-spray-list',
    templateUrl  : './spray-list.component.html',
    styleUrls    : ['./spray-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SprayListComponent implements OnInit {

  sprays: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['paddock','crop','area','speed','detail-button'];
  selected: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {PresetsService} ps
   * @param {FuseSidebarService} _fuseSidebarService
   */
  constructor(
      private ps: PresetsService,
      private _fuseSidebarService: FuseSidebarService
  )
  {
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      this.dataSource = new FilesDataSource(this.ps);

      this.ps.onSprayChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(sprays => {
              this.sprays = sprays;
          });

      this.ps.onSpraySelected
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selected => {
              this.selected = selected;
          });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On select
   *
   * @param selected
   */
  onSelect(selected): void
  {
      this.ps.onSpraySelected.next(selected);
      console.log(selected)
      this.ps.onProductChanged.next(selected.ItemList);
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
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
  )
  {
      super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]>
  {
      return this.ps.onSprayChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void
  {
  }
}
