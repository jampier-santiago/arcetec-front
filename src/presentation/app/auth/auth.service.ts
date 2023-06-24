// Packages
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

// UseCases
import { LoginUseCase } from 'src/domain/useCases/login.useCase';

// Entities
import { UserEntity } from '../../../data/repositories/auth/entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // * Variable with user info
  private _user: BehaviorSubject<UserEntity | null> = new BehaviorSubject(
    null
  ) as BehaviorSubject<UserEntity | null>;

  constructor(private readonly loginUseCase: LoginUseCase) {}

  // * Getter for the user info
  get user$(): Observable<UserEntity> {
    return this._user.asObservable() as Observable<UserEntity>;
  }

  // * Execute the login use case
  login(params: { email: string; password: string }) {
    return this.loginUseCase
      .execute(params)
      .pipe(tap((data: UserEntity | null) => this._user.next(data)));
  }
}
