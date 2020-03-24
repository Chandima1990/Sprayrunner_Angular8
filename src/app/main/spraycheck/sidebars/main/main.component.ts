import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';


import { SpraycheckService } from 'app/main/spraycheck/spraycheck.service';

@Component({
    selector: 'spraycheck-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class SpraycheckMainSidebarComponent implements OnInit, OnDestroy {
    user: any;
    filterBy: string;

    @Input() RefreshCardContent: string = "Last Refreshed";
    // @Output() refreshedOn = new EventEmitter<string>();

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContactsService} scs
     */
    constructor(
        private scs: SpraycheckService
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
        this.filterBy = this.scs.filterBy || 'observational';

        // this._spraycheckService.onSpraychecksChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(user => {
        //         this.user = user;
        //     });
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
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void {
        this.filterBy = filter;

        if (this.filterBy === "observational") {
            this.scs.onHeaderChanged.next(['Date', 'StartDateTime', 'WindSpeed', 'GustSpeed',
                'WindDirectionText', 'Temperature', 'RH', 'DaltaT', 'Rating'])
            this.scs.onSpraychecksChanged.next(this.scs.spraychecksOb);

        }
        if (this.filterBy === "forecast") {
            this.scs.onHeaderChanged.next(['ForecastTime12', 'Wind', 'RainfallProbability', 'Temperature', 'Rating'])
            this.scs.onSpraychecksChanged.next(this.scs.spraychecksFor);

        }

    }
    RefreshClicked() {
        
        this.RefreshCardContent = "Loading...";
        this.scs.getSpraychek().then((d) => {

            this.RefreshCardContent = "Refreshed On " + this.scs.spraychecksOb[0].StartDateTime
        });
    }
}
