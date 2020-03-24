import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CropComponent } from './crop.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';



@NgModule({
    declarations: [
        CropComponent
    ],
    imports: [
        RouterModule,//.forChild(routes),
        TranslateModule,
        FuseSharedModule,


        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        MatOptionModule
    ],
    exports: [
        CropComponent
    ]
})


export class CropModule {
    
}