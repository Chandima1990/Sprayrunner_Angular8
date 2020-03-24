import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { SpraypresetList } from 'app/models/dropdownlist-spraypresets';
import { SpraycheckService } from 'app/main/spraycheck/spraycheck.service';
import { DropdownList } from 'app/models/dropdownlist';
import { SprayrunService } from '../sprayrun.service';
import { SharedDataService } from 'app/services/shared-data.service';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-sprayrun-form-dtd',
  templateUrl: './sprayrun-form-dtd.component.html',
  styleUrls: ['./sprayrun-form-dtd.component.scss'],

  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class SprayrunFormDtdComponent implements OnInit {
  @Input() firstFormGroup: FormGroup;

  constructor(private sds: SharedDataService) { }

  ngOnInit() {

  }

  /**
   * Thisis to send the form details to the next component
   */
  ToConfirm() {
    
    this.sds.changeSprayrunnerForm(this.firstFormGroup);
    
  }
}
