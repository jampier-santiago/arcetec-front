// Packages
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Repository
import { UserRepository } from 'src/domain/repositories/user.repository';

// Entities
import { UserEntity } from './entities/user.entity';

// Variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  constructor(private http: HttpClient) {
    super();
  }

  // * Login with the backend
  login(params: { email: string; password: string }): Observable<UserEntity> {
    return this.http.post<UserEntity>(
      `${environment.back_api}/auth/login`,
      params
    );
  }
}
