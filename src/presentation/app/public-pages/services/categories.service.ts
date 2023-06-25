// Packages
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

// Entity
import { UserEntity } from '../../../../data/repositories/auth/entities/user.entity';

// Models
import { CategoryModel } from 'src/domain/models/category.model';
import { BehaviorSubject, Observable } from 'rxjs';

// UseCases
import { GetAllCategoriesUseCase } from 'src/domain/useCases/get-all-categories.useCases';
import { FindOneCategoryUseCase } from '../../../../domain/useCases/find-one-category.useCases';
import { DeleteCategoryUseCase } from 'src/domain/useCases/delete-category.useCases';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // * Variable with all categories
  private _categories: BehaviorSubject<Array<CategoryModel> | null> =
    new BehaviorSubject(null) as BehaviorSubject<Array<CategoryModel> | null>;
  private token: string = '';

  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly findOneCategoryUseCase: FindOneCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly store: Store<{ auth: UserEntity }>
  ) {
    store.subscribe(({ auth }) => {
      this.token = auth.token || '';
    });
  }

  // * Getter for the categories variable
  get categories$(): Observable<Array<CategoryModel>> {
    return this._categories.asObservable() as Observable<Array<CategoryModel>>;
  }

  // * Method to request the categories to the back
  getAllCategories() {
    this.getAllCategoriesUseCase.execute().subscribe((data) => {
      this._categories.next(data);
    });
  }

  // * Method to bring the filtered categories
  findCategory(term: string) {
    this.findOneCategoryUseCase.execute({ term }).subscribe({
      next: (data) => {
        this._categories.next([data]);
      },
      error: (error) => {
        if (error.error.statusCode === 404) {
          this.getAllCategories();
        }
      },
    });
  }

  // * Method to delete the category
  deleteCategory(id: string): Observable<string> {
    return this.deleteCategoryUseCase.execute({ id, token: this.token });
  }
}
