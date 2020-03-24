import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { KeyService } from './key.service';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Resolve } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CropService implements Resolve<any>{
  onCropChanged: BehaviorSubject<any>;
  crops: any;
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {

    return new Promise((resolve, reject) => {
      Promise.all([
        this.GetItemsCrops(),
      ]).then((data) => {
        this.crops = data;
        this.onCropChanged.next(this.crops);
        resolve(this.crops);

      }, reject);
    });
  }
  UpdateItemCrops(IDListDistinct: string): Promise<any> {

    return new Promise((resolve, reject) => {
      var json = {
        ItemCropList: IDListDistinct
      };

      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("Content-Type", "application/json; charset=utf-8");

      this.as.post(environment.apiURL + "api/v1.0.0/PostOrganisationItemCrops", JSON.stringify(json),
        headers)
        .subscribe(data => {
          this.GetItemsCrops();
          resolve(data);
        },
          error => {
            console.log(error)
          }, reject)
    });

  }

  constructor(private as: ApiService, private ks: KeyService) {
    this.onCropChanged = new BehaviorSubject([]);
  }

  public GetItemsCrops(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("dataType", "json");
      this.as.get(environment.apiURL + `api/v1.0.0/GetOrganisationItemCrops`, headers, "")
        .subscribe((data) => {
          this.crops = data;
          resolve(this.crops);
        }, reject);
    })
  }
}
