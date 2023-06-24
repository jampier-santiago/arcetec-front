// Packages
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
})
export class MenuBarComponent implements OnInit {
  // * Variables
  items: MenuItem[] = [];

  ngOnInit(): void {
    // * Menu items
    this.items = [
      {
        label: 'Categorias',
        icon: 'pi pi-fw pi-folder-open',
        routerLink: '/',
      },
      {
        label: 'Ingresar',
        icon: `pi-sign-in`,
        routerLink: '/auth/login',
      },
    ];
  }
}
