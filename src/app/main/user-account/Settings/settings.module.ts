import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatExpansionModule } from '@angular/material/expansion';

import { SettingsComponent } from './settings.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarContainer } from '@angular/material/snack-bar';


@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        RouterModule,//.forChild(routes),

        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatButtonModule,
        MatSlideToggleModule,

    ],
    exports: [
        SettingsComponent
    ],
    providers: [
        MatSnackBar,
    ],
})
export class SettingsModule {
}
