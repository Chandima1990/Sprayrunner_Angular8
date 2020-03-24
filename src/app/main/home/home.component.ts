import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'app/services/user-account.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Private
  private _unsubscribeAll: Subject<any>;
  constructor(private uas: UserAccountService) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.uas.onUserChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      
      sessionStorage.setItem("UserData", btoa(escape(JSON.stringify(data))));
    });
  }

}
