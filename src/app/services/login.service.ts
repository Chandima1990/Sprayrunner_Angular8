import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { APIheader } from '../../app/models/APIheader';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { UserAccountService } from './user-account.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any;
  rowData: any;
  ResponseData: { Code: any, result: any, status: any };
  LoginData: BehaviorSubject<any>;
  constructor(private apiService: ApiService, private cookieService_login: CookieService, private router: Router, private uas: UserAccountService) {
    // sessionStorage.clear();
    this.LoginData = new BehaviorSubject([]);
  }

  async Login(email: string, password: string, rememberme: boolean): Promise<any> {
    let LoginBody: object = { username: email, password: password, logtype: "normal", AccountType: environment.accountType };

    let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
      .set("auth", environment.ApiKey)
      .set("sitename", environment.siteNameVal)

      .set("Content-Type", "application/json; charset=utf-8");

    this.apiService.post(environment.apiURLForLogin + "api/v1.0.0/AuthLogin", LoginBody, headers).subscribe(data => {
      if (!data.Code) {

        /**
         * using session for the user state
         */
        this.LoginData.next(data);
        sessionStorage.setItem("LoggedInUser", btoa(escape(JSON.stringify(data))));
        if (rememberme) {// if remember me then add the keys to the localStorage as well
          // localStorage.setItem("LoggedInUser", btoa(escape(JSON.stringify(data))));
        }

        this.router.navigate(['./home']);

      } else {
        return new Promise((resolve, reject) => { resolve(false); })
      }
    },
      error => {
        console.log("network Error!")
      });


  }

  get isLoggedIn(): boolean {
    const user = unescape(atob(sessionStorage.getItem("LoggedInUser")));
    const userR = unescape(atob(localStorage.getItem("LoggedInUser")));

    return (user !== "ée" || userR !== "ée") ? true : false;// ée this is the character set after encoding null 
  }

  async SignOut() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
