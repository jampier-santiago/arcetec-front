// Packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Repository
import { CategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryImplementationRepository } from './repositories/category/category-implementation.repository';

// UseCases
import { DeleteCategoryUseCase } from 'src/domain/useCases/delete-category.useCases';
import { FindOneCategoryUseCase } from 'src/domain/useCases/find-one-category.useCases';
import { GetAllCategoriesUseCase } from 'src/domain/useCases/get-all-categories.useCases';
import { MakeNewCategoryUseCase } from 'src/domain/useCases/make-new-category.useCases';
import { UpdateCategoryUseCase } from 'src/domain/useCases/update-category.useCases';

// Implementations
const getAllCategoriesUseCaseFactory = (userRepo: CategoryRepository) =>
  new GetAllCategoriesUseCase(userRepo);
export const getAllCategoriesUseCaseProvider = {
  provide: GetAllCategoriesUseCase,
  useFactory: getAllCategoriesUseCaseFactory,
  deps: [CategoryRepository],
};

const findOneCategoryUseCaseFactory = (userRepo: CategoryRepository) =>
  new GetAllCategoriesUseCase(userRepo);
export const findOneCategoryUseCaseProvider = {
  provide: FindOneCategoryUseCase,
  useFactory: findOneCategoryUseCaseFactory,
  deps: [CategoryRepository],
};

const makeNewCategoryUseCaseFactory = (userRepo: CategoryRepository) =>
  new GetAllCategoriesUseCase(userRepo);
export const makeCategoryUseCaseProvider = {
  provide: MakeNewCategoryUseCase,
  useFactory: makeNewCategoryUseCaseFactory,
  deps: [CategoryRepository],
};

const updateCategoryUseCaseFactory = (userRepo: CategoryRepository) =>
  new GetAllCategoriesUseCase(userRepo);
export const updateCategoryUseCaseProvider = {
  provide: UpdateCategoryUseCase,
  useFactory: updateCategoryUseCaseFactory,
  deps: [CategoryRepository],
};

const deleteCategoryUseCaseFactory = (userRepo: CategoryRepository) =>
  new GetAllCategoriesUseCase(userRepo);
export const deleteCategoryseCaseProvider = {
  provide: DeleteCategoryUseCase,
  useFactory: deleteCategoryUseCaseFactory,
  deps: [CategoryRepository],
};

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    getAllCategoriesUseCaseProvider,
    findOneCategoryUseCaseProvider,
    makeCategoryUseCaseProvider,
    updateCategoryUseCaseProvider,
    deleteCategoryseCaseProvider,
    { provide: CategoryRepository, useClass: CategoryImplementationRepository },
  ],
})
export class DataModule {}
