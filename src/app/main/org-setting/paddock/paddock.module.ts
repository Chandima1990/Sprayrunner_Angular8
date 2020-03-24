import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PaddockComponent } from './paddock.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { PaddockFormComponent } from './paddock-form/paddock-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PaddockListComponent } from './paddock-list/paddock-list.component';
import { OrgSettingService } from 'app/main/org-setting/org-setting.service';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FuseConfirmDialogModule } from '@fuse/components';

const routes: Routes = [
    // {
    //     path: '**',
    //     component: PaddockComponent,
    //     resolve: {
    //         paddocks: OrgSettingService
    //     }
    // }
];

@NgModule({
    declarations: [
        PaddockComponent,
        PaddockFormComponent,
        PaddockListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        FuseConfirmDialogModule,

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        MatCheckboxModule,
        MatRippleModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatSelectModule

    ], providers: [
        OrgSettingService
    ],
    exports: [PaddockComponent],
    entryComponents: [
        PaddockFormComponent
    ]
})


export class PaddockModule {

}