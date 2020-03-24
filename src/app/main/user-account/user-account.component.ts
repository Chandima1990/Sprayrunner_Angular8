import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserAccountService } from 'app/services/user-account.service';
import { KeyService } from 'app/services/key.service';
import { fuseAnimations } from '@fuse/animations';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class UserAccountComponent implements OnInit {
  user_name: string;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(private uas: UserAccountService, private ks: KeyService) {
    
        // Set the private defaults
        this._unsubscribeAll = new Subject();

   }

  ngOnInit() {
    
    this.uas.onUserChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.user_name = data.FirstName + " " + data.LastName; 
    })

   
  }

  getUser() {
   // this.uas.getUser();
  }

}
