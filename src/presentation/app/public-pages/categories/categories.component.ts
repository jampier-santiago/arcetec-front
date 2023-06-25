// Packages
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

// Services
import { CategoriesService } from '../services/categories.service';

// Model
import { CategoryModel } from 'src/domain/models/category.model';

// Redux
import { Store } from '@ngrx/store';

// Entities
import { UserEntity } from '../../../../data/repositories/auth/entities/user.entity';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  // * Variables
  categories: Array<CategoryModel>;
  valueForSearch: string;

  constructor(
    private readonly categoriesService: CategoriesService,
    private messageService: MessageService,
    private readonly store: Store<{ auth: UserEntity }>
  ) {
    this.categories = [];
    this.valueForSearch = '';

    this.store.subscribe((state) => {
      console.log(state);
    });
  }

  ngOnInit(): void {
    // * Get all categories from the database
    this.categoriesService.getAllCategories();

    // * Subscribe to the variable that contains the categories in the service
    this.categoriesService.categories$.subscribe((data) => {
      this.categories = data || [];

      // If no category was found in the user's search, show a toast with the error
      if (this.valueForSearch && data.length > 1) {
        this.messageService.add({
          severity: 'error',
          summary: 'Categoría no encontrada',
          detail:
            'No se pudo encontrar una categoría con el término de búsqueda.',
        });

        this.valueForSearch = '';
      }
    });
  }

  // * Method to be aware of the value of the input
  onBlurInput(value: string) {
    this.valueForSearch = value;
  }

  // * Method to filter the categories with respect to the term supplied by the user
  findCategory() {
    this.valueForSearch.trim().length > 0
      ? this.categoriesService.findCategory(this.valueForSearch)
      : this.categoriesService.getAllCategories();
  }
}
