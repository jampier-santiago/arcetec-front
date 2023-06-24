// Packages
import { Injectable } from '@angular/core';

// Models
import { CategoryModel } from 'src/domain/models/category.model';
import { BehaviorSubject, Observable } from 'rxjs';

// UseCases
import { GetAllCategoriesUseCase } from 'src/domain/useCases/get-all-categories.useCases';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _categories: BehaviorSubject<Array<CategoryModel> | null> =
    new BehaviorSubject(null) as BehaviorSubject<Array<CategoryModel> | null>;

  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase
  ) {}

  get getCategories(): Observable<Array<CategoryModel>> {
    return this._categories.asObservable() as Observable<Array<CategoryModel>>;
  }

  getAllCategories() {}
}
