// Packages
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Repository
import { FileRepository } from 'src/domain/repositories/file.respository';

// Variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileImplementationRepository extends FileRepository {
  constructor(private http: HttpClient) {
    super();
  }

  // * Request to the database, to obtain a category by id or name
  uploadFile(data: any): Observable<{ url: string }> {
    const formdata = new FormData();
    formdata.append('file', data);

    return this.http.post<{ url: string }>(
      `${environment.back_api}/files`,
      formdata
    );
  }
}
