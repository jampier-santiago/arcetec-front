// Packages
import { Injectable } from '@angular/core';

// Models
import { CategoryModel } from 'src/domain/models/category.model';
import { BehaviorSubject, Observable } from 'rxjs';

// UseCases
import { GetAllCategoriesUseCase } from 'src/domain/useCases/get-all-categories.useCases';
import { FindOneCategoryUseCase } from '../../../../domain/useCases/find-one-category.useCases';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // * Variable with all categories
  private _categories: BehaviorSubject<Array<CategoryModel> | null> =
    new BehaviorSubject(null) as BehaviorSubject<Array<CategoryModel> | null>;

  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly findOneCategoryUseCase: FindOneCategoryUseCase
  ) {}

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
}
