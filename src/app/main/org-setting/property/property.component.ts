import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { UserManagementService } from 'app/main/user-management/user-management.service';
import { KeyService } from 'app/services/key.service';
import { DropdownList } from 'app/models/dropdownlist';
import { AddressService } from 'app/services/address.service';
import { Address } from 'app/models/Address';
import { DropdownService } from 'app/services/dropdown.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { RegionList } from 'app/models/dropdownlist-region';
import { OrgSettingService } from 'app/main/org-setting/org-setting.service';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  animations: [fuseAnimations],
  encapsulation: ViewEncapsulation.None,

})
export class PropertyComponent implements OnInit {
  _unsubscribeAll: Subject<any>;
  SpraypropertyData: any;
  /**
   * Models
   */
  Address: Address;
  /**
   * Fields
   */
  PropertyName: string;
  PropertyOwner: any;
  Address1: string;
  Address2: string;
  Region: any;
  State: any;
  Postcode: string;
  Country: any;
  Latitude: string;
  Longitude: string;
  ID: string;
  Userrid: string;
  Name: string;

  /**
   * Dropdowns
   */
  Ownerlist: DropdownList[] = [];
  Regionlist: RegionList[] = [];
  Countrylist: DropdownList[] = [];
  Statelist: DropdownList[] = [];
  /**
   * field controls
   */
  PropertyOwnerControl = new FormControl();
  RegionControl = new FormControl();
  CountryControl = new FormControl();
  StateControl = new FormControl();
  updateOrg: FormGroup;

  /**
   * Viewchilds to set selected
   */
  @ViewChild(MatAutocompleteTrigger, { static: false }) _region: MatAutocompleteTrigger;
  /**
   * filtered dropdown lists
   */
  filteredOwners: Observable<DropdownList[]>;
  filteredRegions: Observable<DropdownList[]>;
  filteredCountries: Observable<DropdownList[]>;
  filteredStates: Observable<DropdownList[]>;
  /**
   * 
   * @param _formBuilder 
   * @param ums 
   * @param as 
   * @param ks 
   */
  constructor(
    private _formBuilder: FormBuilder,
    private ums: UserManagementService,
    private as: AddressService,
    private ks: KeyService,
    private ds: DropdownService,
    private os: OrgSettingService,

  ) {

    /**
     * loads the data and convert to the DropdownList model
     */

    this.GetUsers(() => {
      this.GetCountry(() => {
        this.GetSprayPropertySettings(() => {
          this.GetAddress(() => {});
        })
      });
    })

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    /**
     * Form initializing
     */
    this.updateOrg = this._formBuilder.group({
      PropertyName: [""],
      PropertyOwner: [""],
      Address1: [""],
      Address2: [""],
      Region: [""],
      State: [""],
      Postcode: [""],
      Country: [""],
      Longitude: [""],
      Latitude: [""],
      ID: [""],
      Userrid: [""],
      Name: [""],
    });
    //this.CountryControl.setValue("aus");

    /**
     * filter the dropdown list 
     */
    this.filteredOwners = this.PropertyOwnerControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this.ds._filter(name, this.Ownerlist) : this.Ownerlist)
    );
    this.filteredCountries = this.CountryControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.value),
      map(label => label ? this.ds._filter(label, this.Countrylist) : this.Countrylist)
    );


    this.os.onSprayPropertyChange.pipe(takeUntil(this._unsubscribeAll)).subscribe((d)=>{
      this.SpraypropertyData = d;
    })
  }


  /**
   * 
   * @param item DropdownList, 
   * returns the Display element
   */
  public displayFn(item: DropdownList): string {
    return item && item.label ? item.label : '';
  }

  StateFocus() {
    this.filteredStates = this.StateControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this.ds._filter(name, this.Statelist) : this.Statelist)
    );
  }

  LoadRegion(Suburb?: string) {

    this.as.GetRegion(this.Region["value"])
      .subscribe((data) => {
        this.Regionlist = [];
        data.forEach((item) => {
          this.Regionlist.push({
            label: item.name,
            value: item.name,
            lat: item.lat,
            lng: item.lng,
            postcode: item.postcode,
            state: item.state
          });
        });
      });

  }

  LoadState(state?: string) {

    this.as.GetState(this.Country["value"]).subscribe((data) => {
      this.Statelist = [];
      data[0].forEach((item) => {
        this.Statelist.push({ label: item.State, value: item.StateId });
      });
      this.State = this.Statelist.filter(a => a.value == state || "")[0];

    });
  }

  SetRegionAttrib() {
    this.Postcode = this.Region["postcode"];
    this.Latitude = this.Region["lat"];
    this.Longitude = this.Region["lng"];
  }


  UpdateOrg() {
    this.os.UpdateOrg(this.ID, this.PropertyOwner["value"], this.PropertyName, this.Address1, this.Address2, this.State["value"], "",
      this.Region["value"], this.Postcode, "", this.Country["value"], this.Longitude, this.Latitude);
  }

  private GetAddress(callback) {
    this.as.GetAddress(this.ks.networkid, "").subscribe((data) => {
      this.Address = data;

      this.Address1 = this.Address[0][0].Address1;
      this.Address2 = this.Address[0][0].Address2;
      this.Postcode = this.Address[0][0].Postcode;
      this.Latitude = this.Address[0][0].Latitude;
      this.Longitude = this.Address[0][0].Longitude;
      this.Country = this.Countrylist.filter(a => a.value == this.Address[0][0].Country)[0];

      this.Region = this.Address[0][0].Suburb;


      this.CountryControl.setValue(this.Countrylist.filter(a => a.value == this.Country)[0]);
      this.RegionControl.setValue({ label: this.Region, value: this.Region });

      this.LoadState(this.Address[0][0].State);
      this.LoadRegion(this.Address[0][0].Suburb);
      callback();
    });
  }

  private GetCountry(callback) {
    this.as.GetCountry().subscribe((data) => {
      data.forEach((item) => {
        this.Countrylist.push({ label: item.Country, value: item.Code });
      });
      callback();
    });
  }

  private GetSprayPropertySettings(callback) {
    this.ID = this.SpraypropertyData[0].Id;
    this.Userrid = this.SpraypropertyData[0].userrid;
    this.Name = this.SpraypropertyData[0].name;

    this.PropertyOwnerControl.setValue(this.Ownerlist.filter(a => a.value == this.Userrid)[0])
    this.PropertyName = this.SpraypropertyData[0].name;

    callback()
  }

  private GetUsers(callback) {
    this.ums.users.forEach((item) => {
      this.Ownerlist.push({ label: item.FirstName + " " + item.LastName, value: item.ID });
    });
    callback()
  }
}
