// Packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { ComponentsModule } from '../components/components.module';

// Components
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, RouterModule, ComponentsModule],
})
export class LayoutsModule {}
