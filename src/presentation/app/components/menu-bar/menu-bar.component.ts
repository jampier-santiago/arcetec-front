// Packages
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

// Entity
import { UserEntity } from '../../../../data/repositories/auth/entities/user.entity';

// Actions
import { addData } from '../../auth/redux/auth.actions';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
})
export class MenuBarComponent implements OnInit {
  // * Variables
  items: MenuItem[] = [];

  constructor(
    private readonly store: Store<{ auth: UserEntity }>,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // * Menu items
    this.store.subscribe(({ auth }) => {
      this.items = [
        {
          label: 'Categorias',
          icon: 'pi pi-fw pi-folder-open',
          routerLink: '/',
        },
        {
          label: auth.token ? 'Cerrar sesion' : 'Ingresar',
          icon: auth.token ? `pi-sign-out` : `pi-sign-in`,
          routerLink: auth.token ? '/' : '/auth/login',
          command: () => {
            if (this.router.url.includes('dashboard')) {
              this.store.dispatch(
                addData({ email: '', id: '', name: '', token: '' })
              );
            }
          },
        },
      ];
    });
  }
}
