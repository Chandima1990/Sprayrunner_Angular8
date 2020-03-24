import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { APIheader } from 'app/models/APIheader';
import { environment } from 'environments/environment';
import { KeyService } from './key.service';
import { Address } from '../models/Address';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private as: ApiService, private ks: KeyService) { }


  public GetAddress(busrid: string, userid: string): Observable<Address> {

    let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
      .set("auth", this.ks.key)
      .set("dataType", "json")
      .set("Content-Type", "application/json; charset=utf-8");

    return this.as.get(environment.apiURL + `api/v1.0.0/GetAddress`, headers, "?userrid=" + userid + "&busrid=" + busrid);
  }

  public GetCountry(): Observable<any> {

    let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
      .set("auth", this.ks.key)
      .set("dataType", "json")
      .set("Content-Type", "application/json; charset=utf-8");

    return this.as.get(environment.apiURL + `api/v1.0.0/GetCountry`, headers, "");
  }

  public GetState(CountryCode: string): Observable<any> {

    let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
      .set("auth", this.ks.key)
      .set("dataType", "json")
      .set("contentType", "application/json; charset=utf-8");

    return this.as.get(environment.apiURL + `api/v1.0.0/GetState`, headers, "?country=" + CountryCode);
  }

  public GetRegion(val: string): Observable<any> {

    let json = {
      searchlocation: val,  // search by location name / id
      locationId: '', // 0 fro all locations
      state: "", // y
      forecastsDate: '', // yyyy-mm-dd 2019-12-13
      forecastsTimeRangeStart: "", // optional
      forecastsTimeRangeEnd: "", // optional
      forecastsTime: '', // hh:mm:ss 24 hour
      forecastslocationId: '', // location id ex: 1,2,3,4.... 1215
      observational: '',
      observationallocationId: '',
      TimeZoneToTimeZoneInfo: ""

    }

    let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
      .set("auth", this.ks.key)
      .set("dataType", "json")
      .set("Content-Type", "application/json; charset=utf-8");

    return this.as.post(environment.apiURL + `api/v1.0.0/Restlr/Weather`, JSON.stringify(json), headers);
  }

}
