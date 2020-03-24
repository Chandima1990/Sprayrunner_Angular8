import { Injectable } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { environment } from 'environments/environment';
import { KeyService } from 'app/services/key.service';
import { Applicator } from './applicators/applicator';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';


import { Product } from './spray/sidebars/spray-form/product';
import { CommonName } from './spray/sidebars/spray-form/CommonName';

@Injectable({
  providedIn: 'root'
})

export class PresetsService implements Resolve<any> {
  updatePreset(presetForm: import("@angular/forms").FormGroup) {
    let obj = {
      Id: presetForm.get("ID").value,
      name: presetForm.get("presetName").value,
      brandmodelId: presetForm.get("brand_model").value,
      NozzleSizesId: presetForm.get("brand_size").value,
      NozzlePressureId: presetForm.get("target_pressure").value,

    };

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.post(environment.apiURL + 'api/v1.0.0/PostSprayPresets', JSON.stringify(obj), headers)
        .subscribe(response => {
          this.getPresets();
          resolve(response);
        });
    });
  }


  updateSpray(obj: any): Promise<any> {
    const body = new HttpParams().set("AreaTreated", obj.AreaTreated).
      set("Id", obj.Id).
      set("PresetID", obj.PresetID).
      set("PaddockID", obj.PaddockID).
      set("CropID", obj.CropID).
      set("AreaTreatedParameter", obj.AreaTreatedParameter).
      set("TravelSpeed", obj.TravelSpeed).
      set("ProductList", obj.ProductList);

    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().
        set("auth", this.ks.key).
        set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8").
        set("dataType", "json");

      this.as.post(environment.apiURL + 'api/v1.0.0/PostSprayPresetsProperties',
        body
        , headers)
        .subscribe(response => {
          this.getSprayPresetsProperties(obj.PresetID);
          resolve(response);
        });
    });
  }



  deleteProduct(ID: any, PresetID: string) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.delete(environment.apiURL + 'api/v1.0.0/DeletePesticideCommonNames', JSON.stringify({ "Id": ID }), headers)
        .subscribe(response => {
          this.getSprayPresetsProperties(PresetID);
          resolve(response);
        });
    });
  }

  deleteSprayPresetsProperties(ID: any, PresetID: string) {
    return new Promise((resolve, reject) => {


      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.delete(environment.apiURL + 'api/v1.0.0/DeleteSprayPresetsProperties', JSON.stringify({ "Id": ID }), headers)
        .subscribe(response => {
          this.getSprayPresetsProperties(PresetID);
          resolve(response);
        });
    });
  }

  DeleteSprayPresets(ID: any) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.delete(environment.apiURL + 'api/v1.0.0/DeleteSprayPresets', JSON.stringify({ "Id": ID }), headers)
        .subscribe(response => {
          this.getPresets();
          resolve(response);
        });
    });
  }

  updateProduct(product: any, PresetID: string): Promise<any> {
    const obj = new HttpParams().set("ID", product.ID).
      set("PresetPropID", product.PresetPropID).
      set("ProductID", product.commonNameCtrl.PesticidesCommonNameId).
      set("Amount", product.rate).
      set("Volume", product.volume).
      set("Area", product.area);


    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().
        set("auth", this.ks.key).
        set("dataType", "json");

      this.as.post(environment.apiURL + 'api/v1.0.0/PostSprayPresetsProducts', obj, headers)
        .subscribe(response => {
          this.getSprayPresetsProperties(PresetID);
          resolve(response);
        });
    });


  }


  applicators: Applicator[];
  presets: any;
  crops: any;
  commonNames: any;
  properties: any;
  onApplicatorsChanged: BehaviorSubject<any>;
  onPropertiesChanged: BehaviorSubject<any>;
  onSprayChanged: BehaviorSubject<any>;
  onPresetChanged: BehaviorSubject<any>;
  onProductChanged: BehaviorSubject<any>;
  onSpraySelected: BehaviorSubject<any>;
  onCommonNameChanged: BehaviorSubject<any>;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getApplicators(),

        this.getPresets(),
        this.getOrganisationItemCrops(),
      ]).then((data) => {
        this.onApplicatorsChanged.next(this.applicators);
        resolve();
      }, reject);
    });
  }

  constructor(private as: ApiService, private ks: KeyService) {

    this.onApplicatorsChanged = new BehaviorSubject([]);
    this.onPropertiesChanged = new BehaviorSubject([]);
    this.onSpraySelected = new BehaviorSubject([]);
    this.onPresetChanged = new BehaviorSubject([]);
    this.onSprayChanged = new BehaviorSubject([]);
    this.onProductChanged = new BehaviorSubject([]);
    this.onCommonNameChanged = new BehaviorSubject([]);

  }

  public getApplicators(): Promise<Applicator[]> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.get(environment.apiURL + `api/v1.0.0/GetSprayPresetsApplicator`, headers, "")
        .subscribe((response: any) => {
          this.applicators = response[0];
          /**
           * can map the recieved object with the custom model we have defined in the UI.
           * Can add additional variable values here
           */
          this.applicators = this.applicators.map(applicator => {
            return applicator;
          });
          this.onApplicatorsChanged.next(this.applicators);
          resolve(this.applicators);
        }, reject);
    });
  }

  public getGetSprayPresets(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().
        set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("Content-Type", "application/json; charset=utf-8");

      this.as.get(environment.apiURL + `api/v1.0.0/GetSprayPresets`, headers, "")
        .subscribe((response: any) => {
          this.presets = response;
          resolve(this.presets);
        }, reject);
    });
  }

  /**
   * Update applicator
   *
   * @param applicator
   * @returns {Promise<any>}
   */
  updateApplicator(applicator): Promise<any> {

    let obj = {
      Id: applicator.Id || "",
      userrid: applicator.user,
      //username: applicator.username
    };

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("sitename", this.ks.sitenameVal).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.post(environment.apiURL + 'api/v1.0.0/PostSprayPresetsApplicator', JSON.stringify(obj), headers)
        .subscribe(response => {
          this.getApplicators();
          resolve(response);
        });
    });
  }

  /**
 * Delete applicator
 *
 * @param applicator
 */
  deleteApplicator(applicator): Promise<any> {

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.delete(environment.apiURL + 'api/v1.0.0/DeleteApplicator', JSON.stringify({ "Id": applicator.ID }), headers)
        .subscribe(response => {
          this.getApplicators();
          resolve(response);
        });
    });

  }

  public getPresets(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().
        set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");
      return this.as.get(environment.apiURL + `api/v1.0.0/GetSprayPresets`, headers, "")
        .subscribe((response: any) => {
          this.presets = response;
          this.onPresetChanged.next(this.presets[0])
          this.presets = this.presets.map(preset => {
            return preset;
          });
          
          this.onPropertiesChanged.next("");
          this.onSprayChanged.next("");
          this.onCommonNameChanged.next("");
          this.onProductChanged.next("");
          this.onSpraySelected.next("");
          resolve(this.presets);
        }, reject);
    });
  }

  public getSprayPresetsProperties(Id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().
        set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.get(environment.apiURL + `api/v1.0.0/GetSprayPresetsProperties`, headers, "?Id=" + Id)
        .subscribe((response: any) => {
          this.properties = response;
          this.onPropertiesChanged.next(this.properties);
          this.onSprayChanged.next(response.PresetPropertyList);

          //hardcoded while the backend is ready
          this.onProductChanged.next("");
          this.onCommonNameChanged.next(response.PesticidesCommonName);

          this.onSpraySelected.next("");
          resolve(this.properties);

        }, reject => {
          this.onPropertiesChanged.next("");
          this.onSprayChanged.next("");
          this.onCommonNameChanged.next("");
          this.onProductChanged.next("");
          this.onSpraySelected.next("");

          reject

        });
    });
  }
  public getOrganisationItemCrops(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().
        set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
        set("auth", this.ks.key).
        set("dataType", "json").
        set("Content-Type", "application/json; charset=utf-8");

      this.as.get(environment.apiURL + `api/v1.0.0/GetOrganisationItemCrops`, headers, "")
        .subscribe((response: any) => {
          this.crops = response;
          resolve(this.crops);
        }, reject);
    });
  }

  // public getSprayPresetsPropertiesProducts(CropsId: string): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     let headers = new HttpHeaders().
  //       set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
  //       set("auth", this.ks.key).
  //       set("dataType", "json").
  //       set("Content-Type", "application/json; charset=utf-8");

  //     this.as.get(environment.apiURL + `api/v1.0.0/GetSprayPresetsPropertiesProducts`, headers, "?CropsId=" + CropsId)
  //       .subscribe((response: any) => {
  //         this.commonNames = response;
  //         //hardcodedwhile untill is ready
  //         this.onCommonNameChanged.next(PesticideCommonName.names);
  //         resolve(this.commonNames);
  //       }, reject);
  //   });
  // }
}
