import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SpraycheckService } from './spraycheck.service';
import { SpraypresetList } from 'app/models/dropdownlist-spraypresets';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-spraycheck',
  templateUrl: './spraycheck.component.html',
  styleUrls: ['./spraycheck.component.scss'],
  animations: [fuseAnimations],
  encapsulation: ViewEncapsulation.None,
})

export class SpraycheckComponent implements OnInit {
  spraycheckForm: FormGroup;
  preset: string;
  presets: SpraypresetList[] = [];
  //RefreshCardHead: string = "Refresh";
  @Input() Rating: string = "";
  @Input() RefreshCardContent: string = "Last Refreshed";

  constructor(private scs: SpraycheckService,
    private _formBuilder: FormBuilder
  ) {
    this.spraycheckForm = this._formBuilder.group({
      preset: new FormControl()
    });

  }

  ngOnInit() {
    this.scs.presets[0].forEach((item) => {
      this.presets.push({ label: item.name, value: item.Id, NozzlePressureId: item.NozzlePressureId, brandmodelId: item.brandmodelId, NozzleSizesId: item.NozzleSizesId });
    });
    
  }

  
  PresetSelected(value: any) {
    
    this.RefreshCardContent = "Loading...";
    
    this.scs.getSpraychek().then((d) => {
      
      this.scs.getSprayRating(value.value.brandmodelId, value.value.NozzleSizesId, value.value.NozzlePressureId).then((d1) => {
        this.Rating = d1[0][0].Rating;
        
        this.RefreshCardContent = "Refreshed On " + this.scs.spraychecksOb[0].StartDateTime;

      })
    });
  }
}
