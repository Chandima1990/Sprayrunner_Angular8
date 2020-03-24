import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PropertyComponent } from './property.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
    declarations: [
        PropertyComponent
    ],
    imports: [
        RouterModule,//.forChild(routes),
        TranslateModule,
        FuseSharedModule,


        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        MatDividerModule,
        MatAutocompleteModule
    ],
    exports: [
        PropertyComponent
    ]
})


export class PropertyModule {
}