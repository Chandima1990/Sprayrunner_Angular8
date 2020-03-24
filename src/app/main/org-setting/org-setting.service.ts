import { Injectable } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { APIheader } from 'app/models/APIheader';
import { environment } from 'environments/environment';
import { KeyService } from 'app/services/key.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Paddock } from 'app/models/paddock';
import { FuseUtils } from '@fuse/utils';
import { SprayPropertySettings } from 'app/models/SprayPropertySettings';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrgSettingService implements Resolve<any> {

  /**
   * 
   * Resolver variables 
   *  
   */
  onPaddocksChanged: BehaviorSubject<any>;
  onSprayPropertyChange: BehaviorSubject<any>;
  onSelectedPaddocksChanged: BehaviorSubject<any>;
  onSearchTextChanged: Subject<any>;
  onFilterChanged: Subject<any>;


  SprayProperty: SprayPropertySettings[];
  paddocks: Paddock[];
  user: any;
  selectedPaddocks: string[] = [];

  searchText: string;
  filterBy: string;

  headers: APIheader[] = [];


  constructor(private as: ApiService, private ks: KeyService) {
    this.onPaddocksChanged = new BehaviorSubject([]);
    this.onSelectedPaddocksChanged = new BehaviorSubject([]);
    this.onSearchTextChanged = new Subject();
    this.onFilterChanged = new Subject();

    this.onSprayPropertyChange = new BehaviorSubject([]);

  }

  UpdateOrg(Id: string, userrid: string, name: string, Address1: string, Address2: string, State: string, City: string,
    Suburb: string, Postcode: string, zipcode: string, Country: string, Longitude: string, Latitude: string): Promise<any> {

    return new Promise((resolve, reject) => {
      let Body: object = {
        Id: Id, userrid: userrid, name: name, Address1: Address1, Address2: Address2, State: State, City: City, Suburb: Suburb,
        Postcode: Postcode, zipcode: zipcode, Country: Country, Longitude: Longitude, Latitude: Latitude
      };

      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("dataType", "json")
        .set("Content-Type", "application/json; charset=utf-8");

      this.as.post(environment.apiURL + "api/v1.0.0/PostSprayPropertySettings", JSON.stringify(Body),
        headers)
        .subscribe(data => {
          this.GetSprayPropertySettings();
          resolve(data)
        },
          error => {
            console.log("network Error!")
          }, reject)
    });

  }


  GetSprayPropertySettings(): Promise<any> {

    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("contentType", "application/json; charset=utf-8");
      // this._httpClient.get('api/contacts-contacts')
      this.as.get(environment.apiURL + `api/v1.0.0/GetSprayPropertySettings`, headers, "").subscribe((response: any) => {

        this.SprayProperty = response[0];

        if (this.searchText && this.searchText !== '') {
          this.SprayProperty = FuseUtils.filterArrayByString(this.SprayProperty, this.searchText);
        }

        this.SprayProperty = this.SprayProperty.map(paddock => {
          return new SprayPropertySettings(paddock);
        });

        this.onPaddocksChanged.next(this.SprayProperty);
        this.onSprayPropertyChange.next(this.SprayProperty);
        
        resolve(this.SprayProperty);
      }, reject);
    });
  }


  /**
   *  Start Resolvers
   * @param route 
   * @param state 
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return new Promise((resolve, reject) => {

      Promise.all([
        this.GetSprayPropertySettings().then((value) =>
          this.getPaddocks(value[0].Id)//"yX2N926Ia0rgE163eMx9jQ||||"
        ),
      ]).then((data) => {

        this.onSearchTextChanged.subscribe(searchText => {
          this.searchText = searchText;
          this.getPaddocks(this.SprayProperty[0].Id);
        });

        this.onFilterChanged.subscribe(filter => {
          this.filterBy = filter;
          this.getPaddocks(this.SprayProperty[0].Id);
        });

        this.onPaddocksChanged.next(this.paddocks);
        resolve();

      }, reject);
    });
  }


  /**
   * Get paddocks
   *
   * @returns {Promise<any>}
   */
  getPaddocks(ID: string): Promise<any> {
    return new Promise((resolve, reject) => {


      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8")
      // this._httpClient.get('api/contacts-contacts')
      this.as.get(environment.apiURL + 'api/v1.0.0/GetSprayPaddockIdentifier', headers, "?SprayPropertySettingsId=" + ID)
        .subscribe((response: any) => {

          this.paddocks = response[0];

          if (this.filterBy === 'starred') {
            this.paddocks = this.paddocks.filter(_paddock => {
              return this.user.starred.includes(_paddock.Id);
            });
          }

          if (this.filterBy === 'frequent') {
            this.paddocks = this.paddocks.filter(_paddock => {
              return this.user.frequentPaddocks.includes(_paddock.Id);
            });
          }

          if (this.searchText && this.searchText !== '') {
            this.paddocks = FuseUtils.filterArrayByString(this.paddocks, this.searchText);
          }

          this.paddocks = this.paddocks.map(paddock => {
            return new Paddock(paddock);
          });

          this.onPaddocksChanged.next(this.paddocks);
          resolve(this.paddocks);
        }, reject);
    });
  }

  /**
   * Toggle selected paddock by id
   *
   * @param id
   */
  toggleSelectedPaddock(id): void {
    // First, check if we already have that paddock as selected...
    if (this.selectedPaddocks.length > 0) {
      const index = this.selectedPaddocks.indexOf(id);

      if (index !== -1) {
        this.selectedPaddocks.splice(index, 1);

        // Trigger the next event
        this.onSelectedPaddocksChanged.next(this.selectedPaddocks);

        // Return
        return;
      }
    }

    // If we don't have it, push as selected
    this.selectedPaddocks.push(id);

    // Trigger the next event
    this.onSelectedPaddocksChanged.next(this.selectedPaddocks);
  }

  /**
   * Toggle select all
   */
  toggleSeqlectAll(): void {
    if (this.selectedPaddocks.length > 0) {
      this.deselectPaddocks();
    }
    else {
      this.selectPaddocks();
    }
  }

  /**
   * Select paddocks
   *
   * @param filterParameter
   * @param filterValue
   */
  selectPaddocks(filterParameter?, filterValue?): void {
    this.selectedPaddocks = [];

    // If there is no filter, select all paddocks
    if (filterParameter === undefined || filterValue === undefined) {
      this.selectedPaddocks = [];
      this.paddocks.map(paddock => {
        this.selectedPaddocks.push(paddock.Id);
      });
    }

    // Trigger the next event
    this.onSelectedPaddocksChanged.next(this.selectedPaddocks);
  }

  /**
   * Update paddock
   *
   * @param paddock
   * @returns {Promise<any>}
   */
  updatePaddock(paddock): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("dataType", "json")
        .set("Content-Type", "application/json; charset=utf-8");

      this.as.post(environment.apiURL + 'api/v1.0.0/PostSprayPaddockIdentifier', JSON.stringify(paddock), headers)
        .subscribe(response => {
          this.getPaddocks(paddock.SprayPropertySettingsId);
          resolve(response);
        });
    });
  }

  /**
   * Deselect paddocks
   */
  deselectPaddocks(): void {
    this.selectedPaddocks = [];

    // Trigger the next event
    this.onSelectedPaddocksChanged.next(this.selectedPaddocks);
  }

  /**
   * Delete paddock
   *
  //  * @param paddock
   */
  deletePaddock(paddock): Promise<any> {

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("dataType", "json")
        .set("Content-Type", "application/json; charset=utf-8");

      this.as.delete(environment.apiURL + 'api/v1.0.0/DeleteSprayPaddockIdentifier', JSON.stringify({ "Id": paddock.Id }), headers)
        .subscribe(response => {
          this.getPaddocks(paddock.SprayPropertySettingsId);
          resolve(response);
        });
    });

    // const paddockIndex = this.paddocks.indexOf(paddock);
    // this.paddocks.splice(paddockIndex, 1);
    // this.onPaddocksChanged.next(this.paddocks);
  }

  /**
   * Delete selected paddocks
   */
  deleteSelectedPaddocks(): void {
    for (const paddockId of this.selectedPaddocks) {
      const paddock = this.paddocks.find(_paddock => {
        return _paddock.Id === paddockId;
      });
      const paddockIndex = this.paddocks.indexOf(paddock);
      this.paddocks.splice(paddockIndex, 1);
    }
    this.onPaddocksChanged.next(this.paddocks);
    this.deselectPaddocks();
  }

}
