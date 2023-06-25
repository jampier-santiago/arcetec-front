// Packages
import { Observable } from 'rxjs';

// Base
import { UseCase } from 'src/base/use-cases';

// Repository
import { CategoryRepository } from '../repositories/category.repository';

// Models
import { CategoryModel } from '../models/category.model';

export class MakeNewCategoryUseCase
  implements UseCase<{ data: CategoryModel; token: string }, CategoryModel>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  // * Implementation of the use case to create a new category
  execute(params: {
    data: CategoryModel;
    token: string;
  }): Observable<CategoryModel> {
    return this.categoryRepository.makeNewCategory(params.data, params.token);
  }
}
