import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SpraypresetList } from 'app/models/dropdownlist-spraypresets';
import { SpraycheckService } from '../spraycheck/spraycheck.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DropdownList } from 'app/models/dropdownlist';
import { SprayrunService } from '../sprayrun/sprayrun.service';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { SpraylogService } from './spraylog.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';


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
  selector: 'app-spraylog',
  templateUrl: './spraylog.component.html',
  styleUrls: ['./spraylog.component.scss'],
  animations: [fuseAnimations],
  encapsulation: ViewEncapsulation.None,
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
export class SpraylogComponent implements OnInit {

  spraycheckForm: FormGroup;
  presets: SpraypresetList[] = [];
  applicators: DropdownList[] = [];
  @Input() dataSource: FilesDataSource | null;

  constructor(private scs: SpraycheckService, private srs: SprayrunService, private sls: SpraylogService,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dataSource = new FilesDataSource(this.sls);
    this.spraycheckForm = this._formBuilder.group({
      preset: ['', Validators.required],
      date: ['', Validators.required],
      applicator: ['', Validators.required]
    });

    this.scs.presets[0].forEach((item) => {
      this.presets.push({ label: item.name, value: item.Id, NozzlePressureId: item.NozzlePressureId, brandmodelId: item.brandmodelId, NozzleSizesId: item.NozzleSizesId });
    });
    this.srs.applicators.forEach((item) => {
      this.applicators.push({ label: item.username, value: item.Id });
    });

  }
  Selected() {
    if (this.spraycheckForm.value.applicator != ""  && this.spraycheckForm.value.date != ("" && null)) { //&& this.spraycheckForm.value.preset != ""
      this.sls.GetSprayrunHistory("?ApplicatorId=" + this.spraycheckForm.value.applicator.value + "&SprayrunPresetId="  //this.spraycheckForm.value.preset.value
        + "&StartDate=" + this.spraycheckForm.value.date.format("DD/MMM/YYYY"));
    }
  }

}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {SpraychecksService} scs
     */
    constructor(
        private scs: SpraylogService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this.scs.onSpraylogsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}