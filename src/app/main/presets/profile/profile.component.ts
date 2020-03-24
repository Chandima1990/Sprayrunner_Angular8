import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PresetsService } from '../presets.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() presetForm: FormGroup;
  presetName: string = "";


  constructor(private _formBuilder: FormBuilder, private ps: PresetsService) {
    // Set the private defaults

  }

  ngOnInit() { }

  SubmitPreset() {

    let getdata = this.ps.presets[0].filter((item) => {
      return item.Id === this.presetForm.get("ID").value
    });

    this.presetForm.get("brand_model").setValue(getdata.length !== 0  ? getdata[0].brandmodelId : "");
    this.presetForm.get("brand_size").setValue(getdata.length !== 0  ? getdata[0].NozzleSizesId : "");
    this.presetForm.get("target_pressure").setValue(getdata.length !== 0  ? getdata[0].NozzlePressureId : "");

    this.ps.updatePreset(this.presetForm);
  }

}
