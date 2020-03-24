import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { UserAccountComponent } from './user-account.component';
import { MatDividerModule } from '@angular/material/divider';
import { SettingsModule } from './Settings/settings.module';
import { ProfileModule } from './Profile/profile.module';

@NgModule({
    declarations: [
        UserAccountComponent
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

        FuseSharedModule,


        SettingsModule,
        ProfileModule
        
    ],
    exports: [
        UserAccountComponent
    ]
})
export class UserAccountModule {
}
