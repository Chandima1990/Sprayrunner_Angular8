import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from 'app/models/User';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { KeyService } from 'app/services/key.service';
import { ApiService } from 'app/services/api.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Address } from 'app/models/Address';

@Injectable({
  providedIn: 'root'
})
export class SpraycheckService implements Resolve<any>{
  presets: any;
  onSpraychecksChanged: BehaviorSubject<any>;
  onHeaderChanged: Subject<any>;
  spraychecks: any;
  spraychecksFor: any;
  spraychecksOb: any;
  address: any;
  region: any;

  filterBy: string = "observational";

  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getPresets(),
        this.GetAddress(this.ks.networkid, "").then((data) => {
          this.GetRegion(data[0][0].Suburb)
        }),
      ]).then((data) => {
        this.getSpraychek();
        resolve();
      }, reject);
    });
  }

  constructor(private ks: KeyService, private as: ApiService) {
    this.onSpraychecksChanged = new BehaviorSubject([]);
    this.onHeaderChanged = new BehaviorSubject([]);
  }


  public getPresets(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().
        set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");
      return this.as.get(environment.apiURL + `api/v1.0.0/GetSprayPresets`, headers, "")
        .subscribe((response: any) => {
          this.presets = response;
          /**
           * can map the recieved object with the custom model we have defined in the UI.
           * Can add additional variable values here
           */
          this.presets = this.presets.map(user => {
            return user;
          });
          resolve(this.presets);
        }, reject);
    });
  }

  public getSprayRating(brandmodelId: string, NozzleSizesId: string, NozzlePressureId: string, ): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");
      return this.as.get(environment.apiURL + `api/v1.0.0/GetSprayrunRating`,
        headers, "?modelId=" + brandmodelId + "&sizeId=" + NozzleSizesId + "&pressureId=" + NozzlePressureId)
        .subscribe((response: any) => {
          /**
           * can map the recieved object with the custom model we have defined in the UI.
           * Can add additional variable values here
           */
          resolve(response);
        }, reject);
    });
  }

  public getSpraychek(): Promise<any> {

    return new Promise((resolve, reject) => {
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

      let json = {
        forecastsTimeRangeStart: time, // optional
        searchlocation: '',  // search by location name / id
        locationId: '', // 0 fro all locations
        state: '', // y
        forecastsDate: new Date().toJSON().substring(0, 10), // yyyy-mm-dd 2019-12-13
        forecastsTime: '', // hh:mm:ss 24 hour
        forecastsTimeRangeEnd: "0", // optional
        forecastslocationId: this.region[0].id, // location id ex: 1,2,3,4.... 1215

        observationallocationId: this.region[0].id,
        observational: 'true',
        TimeZoneToTimeZoneInfo: this.region[0].timeZone,

      }

      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("dataType", "json")
        .set("Content-Type", "application/json; charset=utf-8");

      this.as.post(environment.apiURL + `api/v1.0.0/Restlr/Weather`, JSON.stringify(json), headers).subscribe((response: any) => {

        this.spraychecks = response[0];
        this.spraychecksFor = response[1]
        this.spraychecksOb = response[0]

        this.spraychecksFor = this.spraychecksFor.map(spraycheck => {
          let obj = {
            ForecastTime12: spraycheck.ForecastTime12,
            ForecastTime: spraycheck.ForecastTime,
            Wind: spraycheck.Wind,
            RainfallProbability: spraycheck.RainfallProbability,
            Temperature: spraycheck.Temperature,
            LastUpdatedTime: spraycheck.LastUpdatedTime,
            RatingWindSpeed: spraycheck.RatingWindSpeed,
            Rating: "",
          }
          return obj;
        });

        this.spraychecksOb = this.spraychecksOb.map(spraycheck => {
          let obj = {
            Date:"",
            StartDateTime: spraycheck.StartDateTime,
            WindSpeed: spraycheck.WindSpeed,
            GustSpeed: spraycheck.GustSpeed,
            WindDirection: spraycheck.WindDirection,
            WindDirectionText: spraycheck.WindDirectionText,
            Temperature: spraycheck.Temperature,
            RH: spraycheck.RH,
            DaltaT: spraycheck.DaltaT,
            FinishDateTime: spraycheck.FinishDateTime,
            RatingWindSpeed: spraycheck.RatingWindSpeed,
            RatingDaltaT: spraycheck.RatingDaltaT,
            Rating: "",
          }
          return obj;
        });

        if (this.filterBy === "observational") {
          this.onHeaderChanged.next(['Date','StartDateTime', 'WindSpeed', 'GustSpeed',
            'WindDirectionText', 'Temperature', 'RH', 'DaltaT', 'Rating'])
          this.onSpraychecksChanged.next(this.spraychecksOb);

        }
        if (this.filterBy === "forecast") {
          this.onHeaderChanged.next(['ForecastTime12', 'Wind', 'RainfallProbability', 'Temperature', 'Rating'])
          this.onSpraychecksChanged.next(this.spraychecksFor);

        }
        resolve(this.spraychecks);
      }, reject);

    });
  }


  public GetAddress(busrid: string, userid: string): Promise<Address> {
    return new Promise((resolve, reject) => {


      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key)
        .set("auth", this.ks.key)
        .set("dataType", "json")
        .set("Content-Type", "application/json; charset=utf-8");

      this.as.get(environment.apiURL + `api/v1.0.0/GetAddress`, headers, "?userrid=" + userid + "&busrid=" + busrid).subscribe((response: any) => {

        this.address = response;


        resolve(this.address);
      }, reject);

    });

  }


  public GetRegion(val: string): Promise<any> {
    return new Promise((resolve, reject) => {


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

      this.as.post(environment.apiURL + `api/v1.0.0/Restlr/Weather`, JSON.stringify(json), headers).subscribe((response: any) => {

        this.region = response;


        resolve(this.region);
      }, reject);

    });
  }

}
