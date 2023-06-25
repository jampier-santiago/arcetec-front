// Packages
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Repository
import { CategoryRepository } from 'src/domain/repositories/category.repository';

// Entities
import { CategoryEntity } from './entities/category.entity';

// Model
import { CategoryModel } from 'src/domain/models/category.model';

// Variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryImplementationRepository extends CategoryRepository {
  constructor(private http: HttpClient) {
    super();
  }

  // * Request to the database, to obtain all the categories
  getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryEntity[]>(
      `${environment.back_api}/categories`
    );
  }

  // * Request to the database, to obtain a category by id or name
  findOneCategory(term: string): Observable<CategoryModel> {
    return this.http.get<CategoryEntity>(
      `${environment.back_api}/categories/${term}`
    );
  }

  // * Request to the database, to create a category
  makeNewCategory(data: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryEntity>(
      `${environment.back_api}/categories`,
      data
    );
  }

  // * Request to the database, to update a category
  updateCategory(data: Partial<CategoryModel>): Observable<CategoryModel> {
    return this.http.patch<CategoryEntity>(
      `${environment.back_api}/categories`,
      data
    );
  }

  // * Request to the database, to remove an item from the database
  deleteCategory(id: string, token: string): Observable<string> {
    return this.http.delete<string>(
      `${environment.back_api}/categories/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}
