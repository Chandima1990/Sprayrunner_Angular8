import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';


import { OrgSettingComponent } from './org-setting.component';
import { PaddockModule } from './paddock/paddock.module';
import { PropertyModule } from './property/property.module';
import { CropModule } from './crop/crop.module';
import { OrgSettingService } from 'app/main/org-setting/org-setting.service';
import { UserManagementService } from '../user-management/user-management.service';

const routes: Routes = [
    {
        path: '**',
        component: OrgSettingComponent,
        resolve: {
            paddocks: OrgSettingService, users: UserManagementService
        }
    }
];

@NgModule({
    declarations: [
        OrgSettingComponent,

    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,


        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,

        PaddockModule,
        PropertyModule,
        CropModule
    ],
    exports: [
        OrgSettingComponent
    ],
    providers: [OrgSettingService]
})


export class OrgSettingModule {
    constructor() { }
}