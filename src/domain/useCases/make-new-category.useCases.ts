// Packages
import { Observable } from 'rxjs';

// Base
import { UseCase } from 'src/base/use-cases';

// Repository
import { CategoryRepository } from '../repositories/category.repository';

// Models
import { CategoryModel } from '../models/category.model';

export class MakeNewCategoryUseCase
  implements UseCase<CategoryModel, CategoryModel>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  // * Implementation of the use case to create a new category
  execute(params: CategoryModel): Observable<CategoryModel> {
    return this.categoryRepository.makeNewCategory(params);
  }
}
