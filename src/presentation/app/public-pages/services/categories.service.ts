// Packages
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

// Entity
import { UserEntity } from '../../../../data/repositories/auth/entities/user.entity';

// Models
import { CategoryModel } from 'src/domain/models/category.model';

// UseCases
import { GetAllCategoriesUseCase } from 'src/domain/useCases/get-all-categories.useCases';
import { FindOneCategoryUseCase } from '../../../../domain/useCases/find-one-category.useCases';
import { DeleteCategoryUseCase } from 'src/domain/useCases/delete-category.useCases';
import { UploadFileUseCase } from 'src/domain/useCases/upload-image.useCase';
import { MakeNewCategoryUseCase } from 'src/domain/useCases/make-new-category.useCases';
import { UpdateCategoryUseCase } from 'src/domain/useCases/update-category.useCases';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // * Variable with all categories
  private _categories: BehaviorSubject<Array<CategoryModel> | null> =
    new BehaviorSubject(null) as BehaviorSubject<Array<CategoryModel> | null>;
  private token: string = '';

  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly findOneCategoryUseCase: FindOneCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly uploadFileUseCase: UploadFileUseCase,
    private readonly makeNewCategoryUseCase: MakeNewCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly store: Store<{ auth: UserEntity }>
  ) {
    store.subscribe(({ auth }) => {
      this.token = auth.token ?? '';
    });
  }

  // * Getter for the categories variable
  get categories$(): Observable<Array<CategoryModel>> {
    return this._categories.asObservable() as Observable<Array<CategoryModel>>;
  }

  // * Method to request the categories to the back
  getAllCategories() {
    this.getAllCategoriesUseCase.execute().subscribe((data) => {
      this._categories.next(data);
    });
  }

  // * Method to bring the filtered categories
  findCategory(term: string) {
    this.findOneCategoryUseCase.execute({ term }).subscribe({
      next: (data) => {
        this._categories.next([data]);
      },
      error: (error) => {
        if (error.error.statusCode === 404) {
          this.getAllCategories();
        }
      },
    });
  }

  // *
  getDataCategory(id: string): Observable<CategoryModel> {
    return this.findOneCategoryUseCase.execute({ term: id });
  }

  // * Method to delete the category
  deleteCategory(id: string): Observable<string> {
    return this.deleteCategoryUseCase.execute({ id, token: this.token });
  }

  // * Method to upload the image to cloudinary
  changeImageCategory(data: any): Observable<{ url: string }> {
    return this.uploadFileUseCase.execute(data);
  }

  // * Method to create new categories, the method returns the url where from cloudinary
  makeNewCategory(data: CategoryModel) {
    return this.makeNewCategoryUseCase.execute({ data, token: this.token });
  }

  // * Method to update a category
  updateCategory(id: string, data: Partial<CategoryModel>) {
    return this.updateCategoryUseCase.execute({ id, data, token: this.token });
  }
}
