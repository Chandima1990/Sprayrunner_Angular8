import { Component, OnInit, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-org-setting',
  templateUrl: './org-setting.component.html',
  styleUrls: ['./org-setting.component.scss'],
  animations: fuseAnimations
})
export class OrgSettingComponent implements OnInit {

  @Input() paddocks: any;

  constructor() { }

  ngOnInit() {}
}
