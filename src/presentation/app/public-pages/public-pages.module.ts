import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { CategoriesComponent } from './categories/categories.component';

// Services
import { CategoriesService } from './services/categories.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/auth.service';

// Modules
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DataModule } from 'src/data/data.module';
import { ComponentsModule } from '../components/components.module';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

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
    AuthModule,
  ],
  providers: [CategoriesService, MessageService, AuthService],
})
export class PublicPagesModule {}
