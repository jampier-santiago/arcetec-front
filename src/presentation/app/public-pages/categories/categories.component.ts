// Packages
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  private templateImage: string =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAM1BMVEX////O0NLP0dPS1Nb19fb8/Pz5+fr39/jt7u/Z29zp6uvU1tfz8/P///7Y2dvn6Ong4uJDV6wKAAADYklEQVR4nO3b6W6rMBCGYTaDWQrc/9WWBEKMzWpBGar3kc6PEzVRPnliD2AHAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCKSpNOZksdare7I00kbV7n+fvfWdqmujvVSLXhJfLs7mSDi/KFYSkjob4qXzeGIn6J+XUBQ313uE4SXRgwvztdMFZoXJe22H3FEdmmAeP07nhjwEa5i56zLjqSRXUfMLk73jfgyR87BBSwGF4UMJceUFW60JX/NJ/LLlFV1K/pIioL34hDQAFL/VzArB7nQd9uRPQIpqUx03smlBxQTXub2qtKJQe0m1OvfktwQGU3p15DKC5gMb6QxlZAr35LcECn+458VmvBAav/HjBzStTnWwoOqEo74MZvsJh7UUzAHyegc4+mXf+EZnYdEXO5NBPQmmWi9VZGR2E8s45IDtiNiWn9QiqL5sdYdMBJka7nU7X77rch4P1XE7MBg+Izk5azM8hXu1TG9a756Q/MBwzSIi/jut26HCw+4+zcAZUesCs+lW72oNV3ybTfLz/gDmbXGlnTyX8IOL3ssIr0oQET8wtbDcF0un1mQBUb9+Lt6+JpkT4y4Ksm208lus80SrNIHxnwXZOfrmXmoZRZpE8M2JgxZp+aGl23mIDu5dLiHw41Gelg6ampUaRiAqq9AY3fXLX4UHHsun8eFzD93uwOY13PhJsWafmwgGox0tSY6GkBd+/E+BTpwwI2K5Eswwc9K+CRnSZRn+lRASv7RuKqvut+UsDUvo+44d0JCA9ofi/nYcym1/0L2QF1bDRdx7eyvT5LXEDz5m13pR6N/z8wgX683is5YF+Tw5D6bNWTHtC8akgOTaDPCDiOWZcw9dqpJzug8fSsOT6BCgxYTAOaVw2hT31KD3jG/mb9uj0lNGCx8r2PBPwRGvBY17kSUOgIOjtIvAPKHEHPSfM5AZtoa0f2DqHgEk0qa+N15UFrnUodwTM/9r8HlLfQN8snBHrumQL3HIJBzAh+euvNycM5E+IcEzFPksR9lz63g+avZVce7dnYJPU3LjtdF8o4nOVunzyP33bv0112gLC8fyNXT5/TgtpqKfm6taIpN/uvo2Itoz57auWg3G6Tji3JJOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAguAXLpIvOW/ZAVEAAAAASUVORK5CYII=';

  categories: Array<CategoryModel>;
  valueForSearch: string;
  showFormModal: boolean = false;
  modalForEditCategory: boolean = false;
  imageForForm: string = this.templateImage;
  isLogged: boolean = false;

  showLoader: boolean = false;

  // * Html elements
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Form
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly categoriesService: CategoriesService,
    private messageService: MessageService,
    private readonly store: Store<{ auth: UserEntity }>,
    private readonly confirmationService: ConfirmationService
  ) {
    this.categories = [];
    this.valueForSearch = '';

    this.store.subscribe(({ auth }) => {
      this.isLogged = !!auth.token;
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
          },
        });
      },
    });
  }

  // * Modal state handler
  handleFormModal(type: 'edit' | 'make', id?: string) {
    this.modalForEditCategory = type === 'edit';
    this.showFormModal = true;
  }

  // * Method to send the form data to the back
  onSubmit() {
    if (
      this.form.status === 'VALID' &&
      this.imageForForm !== this.templateImage
    ) {
      const { name, description } = this.form.value;

      const data = {
        name: name ?? '',
        description: description ?? '',
        image: this.imageForForm,
      };

      // * Send the information to the backend
      this.categoriesService.makeNewCategory(data).subscribe({
        next: () => {
          this.showFormModal = false;

          this.messageService.add({
            severity: 'success',
            summary: 'Creacion exitosa',
            detail: 'La categoria fue creada con exito',
          });

          this.categoriesService.getAllCategories();
        },
        error: (error) => {
          // * There is no token or it has already expired
          if (error.status === 401) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error en la creación',
              detail: 'No esta autorizado para crear categorias',
            });

            return;
          }

          // * the name is repeated
          if (error.error.message === 'Element exist in db') {
            this.messageService.add({
              severity: 'error',
              summary: 'Error en la creación',
              detail: 'Ya existe otra categoria con este nombre',
            });
          }
        },
      });

      return;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Todos los campos son obligatorios',
    });
  }

  // * Simulate click on file input
  uploadImage() {
    this.fileInput.nativeElement.click();
  }

  // * Upload the file
  handleFileInput(event: Event) {
    if (event) {
      this.showLoader = true;
      const file = (event.target as HTMLInputElement).files!![0];

      this.categoriesService.changeImageCategory(file).subscribe({
        next: ({ url }) => {
          this.showLoader = false;
          this.imageForForm = url;
        },
        error: ({ error }) => {
          this.showLoader = false;

          if (error.message === 'Please upload a file size not more than 1M') {
            this.messageService.add({
              severity: 'error',
              summary: 'Error al subir la imagen',
              detail: 'El peso de la imagen es mayor al permitido',
            });

            return;
          }

          this.showLoader = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar la imagen',
          });
        },
      });
    }
  }
}
