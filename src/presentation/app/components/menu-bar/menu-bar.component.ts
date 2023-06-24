// Packages
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    const isLogged = this.router.url.includes('dashboard');

    this.items = [
      {
        label: 'Categorias',
        icon: 'pi pi-fw pi-folder-open',
        routerLink: '',
      },
      {
        label: isLogged ? 'Cerrar secion' : 'Ingresar',
        icon: `pi pi-fw ${isLogged ? 'pi-sign-out' : 'pi-sign-in'}`,
        routerLink: isLogged ? '' : 'login',
      },
    ];
  }
}
