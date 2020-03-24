import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeyService {


  /**
   * Login data will be stored in these variables. 
   * Subscribe this service and retrive the data. 
   * The base value will be saved in the session. 
   * this does not call the API each time. 
   */
  AppgroupAdmin: false;
  firstname: string;
  key: string;
  lastname: string;
  network: string;
  networkid: string;
  OrganisationType: string;
  SignType: string;
  sitename: string;
  siteurl: string;
  userid: string;
  username: string;
  usertype: string;
  vcn: string;
  vcnen: string;
  sitenameVal: string;


  /**
   * User data will be saved in these variables.
   */

  TenantName: string;
  AccountType: string;
  address1: string;
  address2: string;
  cresditcardno: string;
  cresditcardtype: string;
  expirydate: string;
  Securitycode: string;
  phone: string;
  ID: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  AuthKey: string;
  IsAdmin: boolean;
  Password: string;
  ConPassword: string;
  CurrentPassword: string;
  dateofbirth: string;
  gender: string;
  TFA: string;
  rememberme: boolean;


  constructor() {
    this.keys();
    
    //this.UserData();
    this.sitenameVal = environment.siteNameVal;
  }

  keys() {

    let UserS: any = sessionStorage.getItem("LoggedInUser");
    if (UserS != null) {
      let user = JSON.parse(unescape(atob(UserS)));
      
      this.AppgroupAdmin = user.AppgroupAdmin;
      this.firstname = user.firstname;
      this.key = user.key;
      this.lastname = user.lastname;
      this.network = user.network;
      this.networkid = user.networkid;
      this.OrganisationType = user.OrganisationType;
      this.SignType = user.SignType;
      this.sitename = user.sitename;
      this.siteurl = user.siteurl;
      this.userid = user.userid;
      this.username = user.username;
      this.usertype = user.usertype;
      this.vcn = user.vcn;
      this.vcnen = user.vcnen;
    }
  }

  UserData() {

    let UserS: any = sessionStorage.getItem("UserData");
    if (UserS != null) {
      let user = JSON.parse(unescape(atob(UserS)));

      this.TenantName = user.TenantName;
      this.AccountType = user.AccountType;
      this.address1 = user.address1;
      this.address2 = user.address2;
      this.cresditcardno = user.cresditcardno;
      this.cresditcardtype = user.cresditcardtype;
      this.expirydate = user.expirydate;
      this.Securitycode = user.Securitycode;
      this.phone = user.phone;
      this.ID = user.ID;
      this.FirstName = user.FirstName;
      this.MiddleName = user.MiddleName;
      this.LastName = user.LastName;
      this.Email = user.Email;
      this.AuthKey = user.AuthKey;
      this.IsAdmin = user.IsAdmin;
      this.Password = user.Password;
      this.ConPassword = user.ConPassword;
      this.CurrentPassword = user.CurrentPassword;
      this.dateofbirth = user.dateofbirth;
      this.gender = user.gender;
      this.TFA = user.TFA;
      this.rememberme = user.rememberme;
    }
  }
}
