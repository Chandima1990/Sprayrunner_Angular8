import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { KeyService } from './key.service';
import { environment } from 'environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from 'app/models/User';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService implements Resolve<any> {
  user: User;
  onUserChanged: BehaviorSubject<any>;

  _unsubscribeAll: Subject<any>;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return new Promise((resolve, reject) => {
      Promise.all([
        this.getUser(),
      ]).then((data) => {
        this.onUserChanged.next(this.user);
        resolve(this.user);

      }, reject);
    });

  }
  constructor(private apiService: ApiService, private ks: KeyService) {
    this.onUserChanged = new BehaviorSubject([]);

    this._unsubscribeAll = new Subject();
  }

  UpdateProfile(FirstName: string, LastName: string, UserName: string, url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let Body: object = { FirstName: FirstName, LastName: LastName, UserName: UserName };


      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key)
        .set("dataType", "json")
        .set("Content-Type", "application/json; charset=utf-8")
        .set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key);

      this.apiService.post(environment.apiURL + url, JSON.stringify(Body),
        headers)
        .subscribe(data => {
          this.getUser();
          resolve(data);
        },
          error => {
            console.log("network Error!")
          }, reject)
    });
  }

  ChangeTFA(userid: string, FirstName: any, LastName: any, Email: any, AuthKey: string, gender: any, dateofbirth: string, Password: string, conPassword: string, TFA: string, url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let Body: object = { ID: userid, FirstName: FirstName, LastName: LastName, Email: Email, AuthKey: AuthKey, gender: gender, dateofbirth: dateofbirth, Password: Password, conPassword: conPassword, TFA: TFA };


      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("dataType", "json")
        .set("sitename", this.ks.sitenameVal)
        .set("Content-Type", "application/json; charset=utf-8")
        .set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key);

      this.apiService.post(environment.apiURL + url, JSON.stringify(Body),
        headers)
        .subscribe(data => {
          this.getUser();
          resolve(data);
        },
          error => {
            console.log("network Error!")
          }, reject)
    });
  }

  UpdatePassword(typ: string, Email: string, Password: string, NewPassword: string, ConfirmPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let Body: object = { typ: typ, Email: Email, CurrentPassword: Password, Password: NewPassword, conPassword: ConfirmPassword };


      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("dataType", "json")
        .set("sitename", this.ks.sitenameVal)
        .set("Content-Type", "application/json; charset=utf-8");
      this.apiService.post(environment.apiURL + "api/save/v1.0.0/AuthReset", JSON.stringify(Body),
        headers)
        .subscribe(data => {
          this.getUser();
          resolve(data);
        },
          error => {
            console.log("network Error!")
          }, reject)
    });

  }
  
  UpdateEmail(typ: string, Email: string, Password: string, ConfirmEmail: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let Body: object = { typ: typ, Email: Email, CurrentPassword: Password, ConEmail: ConfirmEmail };

      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("dataType", "json")
        .set("sitename", this.ks.sitenameVal)
        .set("Content-Type", "application/json; charset=utf-8");
      this.apiService.post(environment.apiURL + "api/save/v1.0.0/AuthReset", JSON.stringify(Body),
        headers)
        .subscribe(data => {
          this.getUser();
          resolve(data);
        },
          error => {
            console.log("network Error!")
          }, reject)
    });
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
     this.ks.keys()
      let headers = new HttpHeaders({
        "auth": this.ks.key
        , "Ocp-Apim-Subscription-Key": environment.Ocp_Apim_Subscription_Key
        , "userid": this.ks.userid
        , "busrid": this.ks.networkid
        , "sitename": this.ks.sitenameVal
        , "contentType": "application/json. charset=utf-8"
        , "dataType": "json"
      });

      this.apiService.get(environment.apiURL + 'api/get/v1.0.0/AccountGet', headers, "?emp=")
        .subscribe((data: any) => {
          this.user = data.UserList[0];
          this.onUserChanged.next(this.user);
          resolve(this.user);
        }, reject);
    });
  }

}
