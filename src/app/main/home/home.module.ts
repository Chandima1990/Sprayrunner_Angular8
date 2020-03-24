import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import { HomeComponent } from './home.component';
import { UserAccountService } from 'app/services/user-account.service';
const routes: Routes = [
    {
        path: '**',
        component: HomeComponent,
        resolve: {
            paddocks: UserAccountService
        }
    }
];


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule
    ],
    exports: [
        HomeComponent
    ],
    // providers: [UserAccountService]
})
export class HomeModule {
}
