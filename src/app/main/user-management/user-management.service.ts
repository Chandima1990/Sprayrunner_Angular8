import { Injectable } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { environment } from 'environments/environment';
import { KeyService } from 'app/services/key.service';
import { User } from 'app/models/User';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService implements Resolve<any>{

  users: User[];

  onUsersChanged: BehaviorSubject<any>;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getUsers(),
      ]).then((data) => {

        this.onUsersChanged.next(this.users);
        resolve();

      }, reject);
    });
  }

  constructor(private as: ApiService, private ks: KeyService) {
    this.onUsersChanged = new BehaviorSubject([]);
  }

  public getUsers(): Promise<User[]> {

    return new Promise((resolve, reject) => {


      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).

        set("auth", this.ks.key).
        set("userid", "").
        set("busrid", this.ks.networkid).
        set("sitename", this.ks.sitenameVal).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");


      return this.as.get(environment.apiURL + `api/get/v1.0.0/AccountGet`, headers, "?emp=")
        .subscribe((response: any) => {

          this.users = response.UserList;
          /**
           * can map the recieved object with the custom model we have defined in the UI.
           * Can add additional variable values here
           */
          this.users = this.users.map(user => {
            return user;
          });

          this.onUsersChanged.next(this.users);
          resolve(this.users);
        }, reject);

    });
  }
  /**
   * Update user
   *
   * @param user
   * @returns {Promise<any>}
   */
  updateUser(user): Promise<any> {

    let obj = {
      ID: user.ID,
      FirstName: user.firstname,
      LastName: user.lastname,
      Email: user.email,
      AuthKey: "",
      IsAdmin: "false",
      gender: "Male",
      dateofbirth: "01/01/1960",
      Password: user.password,
      conPassword: user.password,
      TFA: "",
      rememberme: "false",
      emp: ""
    };

    return new Promise((resolve, reject) => {
      

      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("sitename", this.ks.sitenameVal).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.post(environment.apiURL + 'api/save/v1.0.0/AccountAdd', JSON.stringify(obj), headers)
        .subscribe(response => {
          this.getUsers();
          resolve(response);
        });
    });
  }

  /**
 * Delete user
 *
 * @param user
 */
  deleteUser(user): Promise<any> {

    return new Promise((resolve, reject) => {


      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.delete(environment.apiURL + 'api/v1.0.0/DeleteUser', JSON.stringify({ "Id": user.ID }), headers)
        .subscribe(response => {
          this.getUsers();
          resolve(response);
        });
    });

    // const paddockIndex = this.paddocks.indexOf(user);
    // this.paddocks.splice(paddockIndex, 1);
    // this.onPaddocksChanged.next(this.paddocks);
  }

}
