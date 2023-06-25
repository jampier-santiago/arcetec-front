// Packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { LoginComponent } from './login/login.component';

// Modules
import { AuthRoutingModule } from './auth-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DataModule } from 'src/data/data.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

// Services
import { MessageService } from 'primeng/api';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputTextModule,
    ToastModule,
    DataModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    PasswordModule,
    RouterModule,
    StoreModule,
  ],
  providers: [MessageService, AuthService],
})
export class AuthModule {}
