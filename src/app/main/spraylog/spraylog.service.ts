import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { KeyService } from 'app/services/key.service';
import { environment } from 'environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpraylogService implements Resolve<any> {
  applicators: any;
  onSpraylogsChanged: BehaviorSubject<any>;
  spraylog: any;

  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      Promise.all([
        /**
         * here goes the resolvble method calling
         */
      ]).then((data) => {
        resolve();
      }, reject);
    });
  }

  constructor(private as: ApiService, private ks: KeyService, private sls: SpraylogService) {
    this.onSpraylogsChanged = new BehaviorSubject([]);
  }
  /**
   * Submit the spraylog details 
   * @param obj Object of the post method data
   */
  GetSprayrunHistory(obj: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("sitename", this.ks.sitenameVal).
        set("dataType", "json").
        //set("data", obj).
        set("Content-Type", "application/json; charset=utf-8");

      this.as.get(environment.apiURL + 'api/v1.0.0/GetSprayrunHistory', headers, obj)
        .subscribe(response => {
          this.onSpraylogsChanged.next(response);
          this.spraylog = response;
          resolve(this.spraylog);
        });
    });
  }


}
