// Packages
import { Observable } from 'rxjs';

// Base
import { UseCase } from 'src/base/use-cases';

// Repository
import { CategoryRepository } from '../repositories/category.repository';

export class DeleteCategoryUseCase
  implements UseCase<{ id: string; token: string }, string>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  // * Implementation of the use case to delete a category from the database
  // * You can only delete a category by providing the id of said element
  execute(params: { id: string; token: string }): Observable<string> {
    return this.categoryRepository.deleteCategory(params.id, params.token);
  }
}
