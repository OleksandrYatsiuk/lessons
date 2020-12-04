import { SpinButtonComponent } from './components/spin-button/spin-button.component';
import { DeleteComponent } from './components/dialogs/delete/delete.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MaterialModule } from './materials/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ExtractPipe } from './pipes/extract.pipe';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { ChatActionsComponent } from './components/chat-actions/chat-actions.component';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { ErrorValidationComponent } from './components/error-validation/error-validation.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ChatActionsComponent,
    MessageItemComponent,
    FooterComponent,
    DeleteComponent,
    SpinButtonComponent,
    ExtractPipe,
    PreloaderComponent,
    ConfirmComponent,
    ErrorValidationComponent,
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
    HeaderComponent,
    FooterComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularEditorModule,
    DeleteComponent,
    SpinButtonComponent,
    ExtractPipe,
    PreloaderComponent,
    ChatActionsComponent,
    MessageItemComponent,
    ErrorValidationComponent
  ],
})
export class SharedModule { }
