// Packages
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// Redux
import { Store } from '@ngrx/store';

// Entities
import { UserEntity } from 'src/data/repositories/auth/entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isLogged: boolean = false;

  constructor(
    private readonly store: Store<{ auth: UserEntity }>,
    private readonly router: Router
  ) {
    this.store.subscribe((state) => {
      this.isLogged = state.auth.token!!.length > 5;
    });
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.isLogged) this.router.navigate(['']);

    return this.isLogged;
  }
}
