// Packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';

// Components
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CardsComponent } from './cards/cards.component';

@NgModule({
  declarations: [MenuBarComponent, CardsComponent],
  imports: [CommonModule, MenubarModule, CardModule],
  exports: [MenuBarComponent, CardsComponent],
})
export class ComponentsModule {}
