import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// import components 
import { SampleComponent } from './main/sample/sample.component';
import { UserManagementComponent } from './main/user-management/user-management.component';
import { UserAccountComponent } from './main/user-account/user-account.component';
import { OrgSettingComponent } from './main/org-setting/org-setting.component';
import { OrgSettingService } from './main/org-setting/org-setting.service';
import { UserManagementService } from './main/user-management/user-management.service';
import { HomeComponent } from './main/home/home.component';
import { UserAccountService } from './services/user-account.service';
import { CropService } from './services/crop.service';
import { SpraycheckComponent } from './main/spraycheck/spraycheck.component';
import { SpraycheckService } from './main/spraycheck/spraycheck.service';
import { ChatComponent } from './main/chat/chat.component';
import { ChatService } from './main/chat/chat.service';
import { SprayrunComponent } from './main/sprayrun/sprayrun.component';
import { SprayrunService } from './main/sprayrun/sprayrun.service';
import { SpraylogComponent } from './main/spraylog/spraylog.component';
import { SpraylogService } from './main/spraylog/spraylog.service';
import { CommonService } from './services/common.service';
import { PresetsComponent } from './main/presets/presets.component';
import { PresetsService } from './main/presets/presets.service';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], resolve: [CommonService] },
  { path: 'sample', component: SampleComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], resolve: [UserAccountService, CommonService] },
  { path: 'usermanagement', component: UserManagementComponent, canActivate: [AuthGuard], resolve: [UserManagementService, UserAccountService] },//
  { path: 'useraccount', component: UserAccountComponent, canActivate: [AuthGuard], resolve: [UserAccountService] },
  { path: 'orgsetting', component: OrgSettingComponent, canActivate: [AuthGuard], resolve: [OrgSettingService, UserManagementService, CropService] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard], resolve: [ChatService, UserManagementService] },
  { path: 'spraycheck', component: SpraycheckComponent, canActivate: [AuthGuard], resolve: [SpraycheckService] },
  { path: 'sprayrun', component: SprayrunComponent, canActivate: [AuthGuard], resolve: [SprayrunService, SpraycheckService] },
  { path: 'spraylog', component: SpraylogComponent, canActivate: [AuthGuard], resolve: [SprayrunService, SpraycheckService, SpraylogService] },
  { path: 'presets', component: PresetsComponent, canActivate: [AuthGuard], resolve:[ UserManagementService, PresetsService] },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
