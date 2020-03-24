import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { fuseAnimations } from '@fuse/animations';

import { Subject } from 'rxjs';

import { KeyService } from 'app/services/key.service';
import { UserAccountService } from 'app/services/user-account.service';
import { User } from 'app/models/User';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class ProfileComponent implements OnInit, OnDestroy {

    updateProfile: FormGroup;

    FirstName: string;
    LastName: string;
    UserName: string = "";

    UserData: User;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private ks: KeyService,
        private uas: UserAccountService,
        // private _profileService: ProfileService
    ) {
        this._unsubscribeAll = new Subject();
        // Set the private defaults
        ks.UserData();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        
        this.uas.onUserChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
            this.UserData = data;
            this.FirstName = this.UserData.FirstName;
            this.LastName = this.UserData.LastName;
            this.UserName = this.UserData.Email;
        })

        this.updateProfile = this._formBuilder.group({
            FirstName: [""],
            LastName: [""],
            UserName: [""]
        });

    }

    /**
     * Update FirstName and LastName
     */
    UpdateProfile() {
        this.uas.UpdateProfile(this.FirstName, this.LastName, this.UserName, "api/v1.0.0/PostUser");
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
