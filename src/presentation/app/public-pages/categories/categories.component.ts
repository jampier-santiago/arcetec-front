// Packages
import { Component, OnInit } from '@angular/core';

// Services
import { MessageService, ConfirmationService } from 'primeng/api';
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
    private readonly store: Store<{ auth: UserEntity }>,
    private readonly confirmationService: ConfirmationService
  ) {
    this.categories = [];
    this.valueForSearch = '';

    this.store.subscribe((state) => {
      // console.log(state);
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

  // * Show the menu to delete a category
  showModalForDelete(id: string) {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar el producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // * The user agrees to delete the category

        this.categoriesService.deleteCategory(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Tarea completada con éxito.',
              detail: 'Se eliminó la categoría',
            });

            this.categoriesService.getAllCategories();
          },
          error: (error) => {
            const { status } = error;

            // * missing token
            if (status === 401) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No está autorizado para eliminar categorías.',
              });
            }

            // * Try to remove the same product 2 times
            if (status === 404) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Selecciona una categoría inválida.',
              });
            }

            // * Some error related to the server
            if ((status as number).toString().includes('50')) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error en el servidor, inténtelo nuevamente.',
              });
            }

            if (status === 200) {
              this.messageService.add({
                severity: 'info',
                summary: 'Tarea completada con éxito.',
                detail: 'Se eliminó la categoría',
              });

              this.categoriesService.getAllCategories();
            }
          },
        });
      },
    });
  }
}
