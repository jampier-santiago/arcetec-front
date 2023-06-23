// Packages
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Repository
import { CategoryRepository } from 'src/domain/repositories/category.repository';

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

  getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${environment.back_api}/categories`);
  }

  findOneCategory(term: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(
      `${environment.back_api}/categories/${term}`
    );
  }

  makeNewCategory(data: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(
      `${environment.back_api}/categories`,
      data
    );
  }

  updateCategory(data: Partial<CategoryModel>): Observable<CategoryModel> {
    return this.http.patch<CategoryModel>(
      `${environment.back_api}/categories`,
      data
    );
  }

  deleteCategory(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.back_api}/categories/${id}`);
  }
}
