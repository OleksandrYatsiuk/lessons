import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

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
    SidebarModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    ToastModule
  ],
  exports: [
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
    SidebarModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    ToastModule
  ]
})
export class MaterialModule { }
