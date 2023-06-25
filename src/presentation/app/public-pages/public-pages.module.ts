import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { CategoriesComponent } from './categories/categories.component';

// Services
import { CategoriesService } from './services/categories.service';
import { MessageService, ConfirmationService } from 'primeng/api';

// Modules
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataModule } from 'src/data/data.module';
import { ComponentsModule } from '../components/components.module';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    DataModule,
    ComponentsModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    SharedModule,
    StoreModule,
    ConfirmDialogModule,
    SidebarModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ImageModule,
    FileUploadModule,
  ],
  providers: [CategoriesService, MessageService, ConfirmationService],
})
export class PublicPagesModule {}
