import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DropdownList } from 'app/models/dropdownlist';
import { PresetsService } from '../presets.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  @Input() presetForm: FormGroup;
  Brand_Models: DropdownList[] = [];
  Brand_Sizes: DropdownList[] = [];
  Target_Pressures: DropdownList[] = [];

  // brand_model: FormControl;
  // brand_size: FormControl;
  // target_pressure: FormControl;

  constructor(private ps: PresetsService, ) { }

  ngOnInit() {

    this.ps.presets[1].forEach(element => {
      this.Brand_Models.push({ label: element.Nozzelbrandmodel, value: element.brandmodelId })
    });

    this.ps.presets[2].forEach(element => {
      this.Brand_Sizes.push({ label: element.NozzleSizes, value: element.NozzleSizesId })
    });

    this.ps.presets[3].forEach(element => {
      this.Target_Pressures.push({ label: element.NozzlePressure, value: element.NozzlePressureId })
    });

  }


  SubmitPreset() {


    let getdata = this.ps.presets[0].filter((item) => {
      return item.Id === this.presetForm.get("ID").value
    });

    if (getdata.length !== 0) {
      this.presetForm.get("presetName").setValue(getdata.length !== 0 ? getdata[0].name : "");
    }
    this.ps.updatePreset(this.presetForm);
  }


}
