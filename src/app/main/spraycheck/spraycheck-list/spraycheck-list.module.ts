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
import { SpraycheckListComponent } from './spraycheck-list.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [
        SpraycheckListComponent
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
        MatTableModule,
        

        FuseSharedModule,
    ],
    exports: [
        SpraycheckListComponent
    ]
})
export class SpraycheckListModule {
}
