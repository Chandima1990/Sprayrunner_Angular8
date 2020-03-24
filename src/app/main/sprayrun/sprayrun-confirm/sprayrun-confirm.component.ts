import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedDataService } from 'app/services/shared-data.service';
import { FormGroup } from '@angular/forms';
import { SpraycheckService } from 'app/main/spraycheck/spraycheck.service';
import { SprayrunService } from '../sprayrun.service';

@Component({
  selector: 'app-sprayrun-confirm',
  templateUrl: './sprayrun-confirm.component.html',
  styleUrls: ['./sprayrun-confirm.component.scss']
})
export class SprayrunConfirmComponent implements OnInit {

  FormSendToSubmit: FormGroup;
  private _unsubscribeAll: Subject<any>;

  date: string = "Not Found!";
  time: string = "Not Found!";
  duration: string = "Not Found!";
  applicator: string = "Not Found!";
  preset: string = "Not Found!";

  constructor(private sds: SharedDataService, private scs: SpraycheckService, private srs: SprayrunService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.sds.sprayrunForm.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      if (data.length !== 0) {
        this.FormSendToSubmit = data;
        this.date = data.value.date.format("DD/MM/YYYY");
        this.time = data.value.time;
        this.duration = data.value.duration + "hours";
        this.applicator = data.value.applicator.label;
        this.preset = data.value.preset.label;
      }
    })
  }
  
  /**
   * Submit the sprayrun details
   */
  Submit() {

    let obj = {
      ApplicatorId: this.FormSendToSubmit.value.applicator.value,
      SprayrunPresetId: this.FormSendToSubmit.value.preset.value,
      brandmodelId: this.FormSendToSubmit.value.preset.brandmodelId,
      NozzleSizesId: this.FormSendToSubmit.value.preset.NozzleSizesId,
      NozzlePressureId: this.FormSendToSubmit.value.preset.NozzlePressureId,
      StartTime: this.FormSendToSubmit.value.time, 
      Duration: this.FormSendToSubmit.value.duration, 
      StartDate: this.FormSendToSubmit.value.date.format("DD/MMM/YYYY"), 
      TimeZoneToTimeZoneInfo: this.scs.region[0].timeZone,
      latit: this.scs.region[0].lat,
      longt: this.scs.region[0].lng
    };

    this.srs.submitSprayrun(obj);
  }
}
