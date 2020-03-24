import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from 'app/main/login/login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from 'app/services/interceptor-service.service';
import { SpinnerComponent } from 'app/uielements/spinner/spinner.component';


@NgModule({
    declarations: [
        LoginComponent,SpinnerComponent
    ],
    imports: [
        RouterModule.forChild([{ path:  "login", component: LoginComponent }]),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,

        FuseSharedModule
    ],
    exports: [
        LoginComponent
    ],
    providers:[
        
    ]
})
export class LoginModule {
}
