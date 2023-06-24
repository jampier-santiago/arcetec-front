import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { CategoriesComponent } from './categories/categories.component';

// Services
import { CategoriesService } from './services/categories.service';
import { MessageService } from 'primeng/api';

// Modules
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DataModule } from 'src/data/data.module';
import { ComponentsModule } from '../components/components.module';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../shared/shared.module';

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
  ],
  providers: [CategoriesService, MessageService],
})
export class PublicPagesModule {}
