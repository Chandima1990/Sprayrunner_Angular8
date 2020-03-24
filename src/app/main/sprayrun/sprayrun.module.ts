import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SprayrunComponent } from './sprayrun.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SprayrunFormDtdComponent } from './sprayrun-form-dtd/sprayrun-form-dtd.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { SprayrunConfirmComponent } from './sprayrun-confirm/sprayrun-confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { SprayrunFormApComponent } from './sprayrun-form-ap/sprayrun-form-ap.component';

@NgModule({
    declarations: [
        SprayrunComponent,
        SprayrunFormDtdComponent,
        SprayrunConfirmComponent,
        SprayrunFormApComponent,
    ],
    imports: [
        RouterModule,//.forChild(routes),
        MatStepperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatDatepickerModule,
        NativeDateModule,
        MatOptionModule,
        MatSelectModule,
        CommonModule,
        MatButtonModule,
    ],
    exports: [
        SprayrunComponent
    ],
})
export class SprayrunModule {
}
