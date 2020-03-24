import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { SpraylogService } from '../spraylog.service';
import { FilesDataSource } from 'app/main/user-management/user-list/user-list.component';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-spraylog-list',
  templateUrl: './spraylog-list.component.html',
  styleUrls: ['./spraylog-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SpraylogListComponent implements OnInit {

  @Input() dataSource: FilesDataSource | null;
  // Private
  private _unsubscribeAll: Subject<any>;
  displayedColumns = ["StartTime","WindSpeed", "GustSpeed", "WindDirectionText", "Temperature", "RH", "Rating"];
  constructor( private sls: SpraylogService) {
    // Set the private defaults
    this._unsubscribeAll = new Subject(); }

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

}
