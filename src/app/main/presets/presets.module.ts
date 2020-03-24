import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatDividerModule } from '@angular/material/divider';
import { PresetsComponent } from './presets.component';
import { ApplicatorsComponent } from './applicators/applicators.component';
import { ProfileComponent } from './profile/profile.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { SprayComponent } from './spray/spray.component';
import { ApplicatorListComponent } from './applicators/applicator-list/applicator-list.component';
import { ApplicatorFormComponent } from './applicators/applicator-form/applicator-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule, MatOptionModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { SprayFormComponent } from './spray/sidebars/spray-form/spray-form.component';
import { SprayListComponent } from './spray/spray-list/spray-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseSidebarModule } from '@fuse/components';
import { ProductListComponent } from './spray/sidebars/spray-form/product-list/product-list.component';
import { ProductFormComponent } from './spray/sidebars/spray-form/product-form/product-form.component';
import { MatDialogModule, MatDialogRef, MatDialog, MatAutocompleteModule, MatListModule } from '@angular/material/';

@NgModule({
    declarations: [
        PresetsComponent,
        ApplicatorsComponent,
        ProfileComponent,
        EquipmentComponent,
        SprayComponent,
        ApplicatorListComponent,
        ApplicatorFormComponent,
        SprayFormComponent,
        SprayListComponent,
        ProductListComponent,
        ProductFormComponent
    ],
    imports: [
        RouterModule,//.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,

        MatRippleModule,
        MatMenuModule,
        MatToolbarModule,
        MatOptionModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatListModule,
        

        FuseSharedModule,
        FuseSidebarModule,


    ],
    exports: [
        PresetsComponent
    ],
    entryComponents: [ApplicatorFormComponent, ProductFormComponent, SprayFormComponent]
})
export class PresetsModule {
}
