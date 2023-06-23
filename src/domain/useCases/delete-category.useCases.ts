// Packages
import { Observable } from 'rxjs';

// Base
import { UseCase } from 'src/base/use-cases';

// Repository
import { CategoryRepository } from '../repositories/category.repository';

export class DeleteCategoryUseCase implements UseCase<{ id: string }, string> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(params: { id: string }): Observable<string> {
    return this.categoryRepository.deleteCategory(params.id);
  }
}
