// Packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Repository
import { CategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryImplementationRepository } from './repositories/category/category-implementation.repository';

import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserImplementationRepository } from './repositories/auth/auth-implementation.repository';

import { FileRepository } from 'src/domain/repositories/file.respository';
import { FileImplementationRepository } from './repositories/files/file-implementation.repository';

// UseCases
import { DeleteCategoryUseCase } from 'src/domain/useCases/delete-category.useCases';
import { FindOneCategoryUseCase } from 'src/domain/useCases/find-one-category.useCases';
import { GetAllCategoriesUseCase } from 'src/domain/useCases/get-all-categories.useCases';
import { MakeNewCategoryUseCase } from 'src/domain/useCases/make-new-category.useCases';
import { UpdateCategoryUseCase } from 'src/domain/useCases/update-category.useCases';

import { LoginUseCase } from 'src/domain/useCases/login.useCase';

import { UploadFileUseCase } from 'src/domain/useCases/upload-image.useCase';

// * Implementation of the use case to have all the categories of the database
const getAllCategoriesUseCaseFactory = (userRepo: CategoryRepository) =>
  new GetAllCategoriesUseCase(userRepo);
export const getAllCategoriesUseCaseProvider = {
  provide: GetAllCategoriesUseCase,
  useFactory: getAllCategoriesUseCaseFactory,
  deps: [CategoryRepository],
};

// * Implementation of the use case to filter a category from the database
const findOneCategoryUseCaseFactory = (userRepo: CategoryRepository) =>
  new FindOneCategoryUseCase(userRepo);
export const findOneCategoryUseCaseProvider = {
  provide: FindOneCategoryUseCase,
  useFactory: findOneCategoryUseCaseFactory,
  deps: [CategoryRepository],
};

// * Implementation of the use case to create a new category
const makeNewCategoryUseCaseFactory = (userRepo: CategoryRepository) =>
  new MakeNewCategoryUseCase(userRepo);
export const makeCategoryUseCaseProvider = {
  provide: MakeNewCategoryUseCase,
  useFactory: makeNewCategoryUseCaseFactory,
  deps: [CategoryRepository],
};

// * Implementation of the use case to update a category
const updateCategoryUseCaseFactory = (userRepo: CategoryRepository) =>
  new UpdateCategoryUseCase(userRepo);
export const updateCategoryUseCaseProvider = {
  provide: UpdateCategoryUseCase,
  useFactory: updateCategoryUseCaseFactory,
  deps: [CategoryRepository],
};

// * Implementation of the use case to delete a category from the database
const deleteCategoryUseCaseFactory = (userRepo: CategoryRepository) =>
  new DeleteCategoryUseCase(userRepo);
export const deleteCategoryseCaseProvider = {
  provide: DeleteCategoryUseCase,
  useFactory: deleteCategoryUseCaseFactory,
  deps: [CategoryRepository],
};

// * Implementation of the use case, the login of a user
const loginUseCaseFactory = (userRepo: UserRepository) =>
  new LoginUseCase(userRepo);
export const loginseUseCaseProvider = {
  provide: LoginUseCase,
  useFactory: loginUseCaseFactory,
  deps: [UserRepository],
};

// *
const uploadFileUseCaseFactory = (userRepo: FileRepository) =>
  new UploadFileUseCase(userRepo);
export const uploadFileUseProvider = {
  provide: UploadFileUseCase,
  useFactory: uploadFileUseCaseFactory,
  deps: [FileRepository],
};

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    getAllCategoriesUseCaseProvider,
    findOneCategoryUseCaseProvider,
    makeCategoryUseCaseProvider,
    updateCategoryUseCaseProvider,
    deleteCategoryseCaseProvider,
    loginseUseCaseProvider,
    uploadFileUseProvider,
    { provide: CategoryRepository, useClass: CategoryImplementationRepository },
    { provide: UserRepository, useClass: UserImplementationRepository },
    { provide: FileRepository, useClass: FileImplementationRepository },
  ],
})
export class DataModule {}
