import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import {TabMenuModule} from 'primeng/tabmenu';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSlideToggleModule,
    // primeNG
    MultiSelectModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputSwitchModule,
    InputMaskModule,
    InputTextareaModule,
    BadgeModule,
    ProgressBarModule,
    AccordionModule,
    TableModule,
    TabMenuModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSlideToggleModule,
    // primeNG
    MultiSelectModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputSwitchModule,
    InputMaskModule,
    InputTextareaModule,
    BadgeModule,
    ProgressBarModule,
    AccordionModule,
    TableModule,
    TabMenuModule
  ]
})
export class MaterialModule { }
