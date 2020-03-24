import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import { UserManagementComponent } from './user-management.component';
import { UserManagementService } from './user-management.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
const routes: Routes = [
    {
        path: '**',
        component: UserManagementComponent,
        resolve: {
            paddocks: UserManagementService
        }
    }
];
@NgModule({
    declarations: [
        UserManagementComponent,
        UserListComponent,
        UserFormComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatRippleModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,


        FuseSharedModule
    ],
    exports: [
        UserManagementComponent
    ],
    providers: [
        UserManagementService
    ], 
    entryComponents: [UserFormComponent]
})
export class UserManagementModule {
}
