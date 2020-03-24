import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { PresetsService } from '../presets.service';
import { FormControl } from '@angular/forms';
import { SpraypresetList } from 'app/models/dropdownlist-spraypresets';



@Component({
  selector: 'app-spray',
  templateUrl: './spray.component.html',
  styleUrls: ['./spray.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SprayComponent implements OnInit {
  selected: any;
  pathArr: string[];
  @Input() preset: SpraypresetList;
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
    this.ps.onSpraySelected
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selected => {
        this.selected = selected;
        //this.pathArr = selected.location.split('>');
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
   * On select
   *
   * @param selected
   */
  OnAddNew(): void {
    this.ps.onSpraySelected.next({ PresetID: this.preset.value });
    this.ps.onProductChanged.next("")
    this.toggleSidebar("spray-form-sidebar")
  }

  /**
     * Toggle the sidebar
     *
     * @param name
     */
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}
