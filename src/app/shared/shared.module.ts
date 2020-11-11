import { SpinButtonComponent } from './components/spin-button/spin-button.component';
import { DeleteComponent } from './components/dialogs/delete/delete.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ExtractPipe } from './pipes/extract.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DeleteComponent,
    SpinButtonComponent,
    ExtractPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularEditorModule,
  ],
  exports: [
    HeaderComponent, FooterComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularEditorModule,
    DeleteComponent,
    SpinButtonComponent,
    ExtractPipe
  ],
})
export class SharedModule { }
