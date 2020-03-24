import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-sprayrun',
  templateUrl: './sprayrun.component.html',
  styleUrls: ['./sprayrun.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SprayrunComponent implements OnInit {
  @Input() firstFormGroup: FormGroup;
  @Input() FormSendToChild: any;
  @Input() Duration: string;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: ['', Validators.required],
      applicator: [''],
      preset: [''],
    });
  }
}
