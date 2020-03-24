import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatDividerModule } from '@angular/material/divider';
import { SpraycheckComponent } from './spraycheck.component';
import { SpraycheckListModule } from './spraycheck-list/spraycheck-list.module';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { SpraycheckMainSidebarComponent } from './sidebars/main/main.component';
import { FuseSidebarModule } from '@fuse/components';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        SpraycheckComponent,
        SpraycheckMainSidebarComponent
    ],
    imports: [
        RouterModule,//.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule,


        FuseSharedModule,
        FuseSidebarModule,

        SpraycheckListModule

    ],
    exports: [
        SpraycheckComponent
    ]
})
export class SpraycheckModule {
}
