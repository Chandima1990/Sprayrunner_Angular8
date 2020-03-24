import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { MatGridListModule } from '@angular/material/grid-list';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from "app/app.component";
import { LayoutModule } from './layout/layout.module';
import { SampleModule } from './main/sample/sample.module';

import { LoginModule } from './main/login/login.module';
import { CookieService } from 'ngx-cookie-service';
import { UserManagementModule } from './main/user-management/user-management.module';
import { AuthGuard } from './guards/auth.guard';
import { LoginService } from './services/login.service';
import { AppRoutingModule } from './app-routing.module';
import { InterceptorService } from './services/interceptor-service.service';
import { HomeModule } from './main/home/home.module';
import { UserAccountModule } from './main/user-account/user-account.module';
import { OrgSettingModule } from './main/org-setting/org-setting.module';
import { HttpcancelService } from './services/httpcancel.service';
import { SpraycheckModule } from './main/spraycheck/spraycheck.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChatModule } from './main/chat/chat.module';
import { ChatBotComponent } from './main/chat-bot/chat-bot.component';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SprayrunModule } from './main/sprayrun/sprayrun.module';

import { SpraylogModule } from './main/spraylog/spraylog.module';

import { PresetsModule } from './main/presets/presets.module';



@NgModule({
    declarations: [
        AppComponent,
        ChatBotComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        TranslateModule.forRoot(),
        //test db
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatSnackBarModule,


        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        LoginModule,
        UserManagementModule,
        HomeModule,
        UserAccountModule,
        OrgSettingModule,
        SpraycheckModule,
        ChatModule,
        SprayrunModule,
        SpraylogModule,
        PresetsModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        HttpClientModule,
        CookieService,
        AuthGuard,
        HttpcancelService,
        LoginService, {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        },
        Title
    ]
})
export class AppModule {
}
