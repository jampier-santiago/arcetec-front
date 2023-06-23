// Packages
import { Observable } from 'rxjs';

// Base
import { UseCase } from 'src/base/use-cases';

// Repository
import { CategoryRepository } from '../repositories/category.repository';

// Models
import { CategoryModel } from '../models/category.model';

export class UpdateCategoryUseCase
  implements UseCase<Partial<CategoryModel>, CategoryModel>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(params: Partial<CategoryModel>): Observable<CategoryModel> {
    return this.categoryRepository.updateCategory(params);
  }
}
