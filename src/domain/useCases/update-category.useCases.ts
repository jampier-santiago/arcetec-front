// Packages
import { Observable } from 'rxjs';

// Base
import { UseCase } from 'src/base/use-cases';

// Repository
import { CategoryRepository } from '../repositories/category.repository';

// Models
import { CategoryModel } from '../models/category.model';

export class UpdateCategoryUseCase
  implements
    UseCase<{ data: Partial<CategoryModel>; token: string }, CategoryModel>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  // * Implementation of the use case to update a category
  execute(params: {
    data: Partial<CategoryModel>;
    token: string;
  }): Observable<CategoryModel> {
    return this.categoryRepository.updateCategory(params.data, params.token);
  }
}
