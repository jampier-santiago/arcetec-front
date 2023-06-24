// Packages
import { Observable } from 'rxjs';

// Models
import { CategoryModel } from '../models/category.model';

export abstract class CategoryRepository {
  // * All the functionalities (actions) related to the categories

  abstract getAllCategories(): Observable<Array<CategoryModel>>;
  abstract findOneCategory(term: string): Observable<CategoryModel>;
  abstract makeNewCategory(data: CategoryModel): Observable<CategoryModel>;
  abstract updateCategory(
    data: Partial<CategoryModel>
  ): Observable<CategoryModel>;
  abstract deleteCategory(id: string): Observable<string>;
}
