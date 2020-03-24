import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { environment } from 'environments/environment';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { KeyService } from './key.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements Resolve<any> {

  UserManagement: string;
  OrganaisationalSettings: string;
  Spraycheck: string;
  Sprayrun: string;
  Spraylog: string;
  MyProfile: string;

  OnTitleListChange: BehaviorSubject<any>;

  constructor(private as: ApiService, private ks: KeyService) {
    this.OnTitleListChange = new BehaviorSubject([]); 
  }

  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.GetTitles(),
      ]).then((data) => {
        this.OnTitleListChange.next(data);
        resolve();
      }, reject);
    });
  }

  public GetTitles(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
        .set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("contentType", 'application/json; charset=utf-8')
        .set("sitename", this.ks.sitenameVal)
        .set("dataType", "json");
      this.as.get(environment.apiURL + `api/v1.0.0/GetAPIServicesTitile`, headers, "")
        .subscribe((data) => {
          resolve(data);
        }, reject);
    })
  }
}
