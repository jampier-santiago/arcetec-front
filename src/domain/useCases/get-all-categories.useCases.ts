// Packages
import { Observable } from 'rxjs';

// Base
import { UseCase } from 'src/base/use-cases';

// Repository
import { CategoryRepository } from '../repositories/category.repository';

// Models
import { CategoryModel } from '../models/category.model';

export class GetAllCategoriesUseCase
  implements UseCase<void, Array<CategoryModel>>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  // * Implementation of the use case to have all the categories of the database
  execute(): Observable<Array<CategoryModel>> {
    return this.categoryRepository.getAllCategories();
  }
}
