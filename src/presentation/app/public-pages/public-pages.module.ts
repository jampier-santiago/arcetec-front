import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { CategoriesComponent } from './categories/categories.component';

// Services
import { CategoriesService } from './services/categories.service';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CommonModule],
  providers: [CategoriesService],
})
export class PublicPagesModule {}
