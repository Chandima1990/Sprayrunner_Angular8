import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpraylogComponent } from './spraylog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SpraylogListComponent } from './spraylog-list/spraylog-list.component';

@NgModule({
    declarations: [
        SpraylogComponent,
        SpraylogListComponent,
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
        SpraylogComponent
    ],
})
export class SpraylogModule {
}
