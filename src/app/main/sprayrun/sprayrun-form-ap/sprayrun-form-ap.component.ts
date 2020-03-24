import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedDataService } from 'app/services/shared-data.service';
import { SpraypresetList } from 'app/models/dropdownlist-spraypresets';
import { DropdownList } from 'app/models/dropdownlist';
import { SpraycheckService } from 'app/main/spraycheck/spraycheck.service';
import { SprayrunService } from '../sprayrun.service';

@Component({
  selector: 'app-sprayrun-form-ap',
  templateUrl: './sprayrun-form-ap.component.html',
  styleUrls: ['./sprayrun-form-ap.component.scss']
})
export class SprayrunFormApComponent implements OnInit {

  presets: SpraypresetList[] = [];
  applicators: DropdownList[] = [];
  @Input() firstFormGroup: FormGroup;

  constructor(private sds: SharedDataService, private scs: SpraycheckService, private srs: SprayrunService, ) { }

  ngOnInit() {

    this.scs.presets[0].forEach((item) => {
      this.presets.push({ label: item.name, value: item.Id, NozzlePressureId: item.NozzlePressureId, brandmodelId: item.brandmodelId, NozzleSizesId: item.NozzleSizesId });
    });

    this.srs.applicators.forEach((item) => {
      this.applicators.push({ label: item.username, value: item.Id });
    });
    
  }
  ToConfirm() {
    
    this.sds.changeSprayrunnerForm(this.firstFormGroup);

  }
}
