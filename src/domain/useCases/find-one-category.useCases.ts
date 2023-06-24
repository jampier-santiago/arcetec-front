// Packages
import { Observable } from 'rxjs';

// Base
import { UseCase } from 'src/base/use-cases';

// Repository
import { CategoryRepository } from '../repositories/category.repository';

// Models
import { CategoryModel } from '../models/category.model';

export class FindOneCategoryUseCase
  implements UseCase<{ term: string }, CategoryModel>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  // * Implementation of the use case to filter a category from the database
  // * You can only filter by gave the category name
  execute(params: { term: string }): Observable<CategoryModel> {
    return this.categoryRepository.findOneCategory(params.term);
  }
}
