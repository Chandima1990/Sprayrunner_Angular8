import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { KeyService } from 'app/services/key.service';
import { environment } from 'environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SprayrunService implements Resolve<any> {
  applicators: any;
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.GetApplicators(),
      ]).then((data) => {
        resolve();
      }, reject);
    });
  }

  constructor(private as: ApiService, private ks: KeyService) { }

  /**
   * Get the applicator list for dropdown
   */
  public GetApplicators(): Promise<any> {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("dataType", "json")
        .set("Content-Type", "application/json; charset=utf-8");

      this.as.get(environment.apiURL + `api/v1.0.0/GetSprayPresetsApplicator`, headers, "").subscribe((response: any) => {
        this.applicators = response[0];
        resolve(this.applicators);
      }, reject);

    });

  }
/**
 * Submit the sprayrun details 
 * @param obj Object of the post method data
 */
  submitSprayrun(obj:any): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("sitename", this.ks.sitenameVal).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.post(environment.apiURL + 'api/v1.0.0/Restlr/PostSprayrun', JSON.stringify(obj), headers)
        .subscribe(response => {
          resolve(response);
        });
    });
  }


}
