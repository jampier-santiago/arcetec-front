// Packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';

// Components
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CardsComponent } from './cards/cards.component';

// Serices
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [MenuBarComponent, CardsComponent],
  imports: [CommonModule, MenubarModule, CardModule, StoreModule, ButtonModule],
  exports: [MenuBarComponent, CardsComponent],
  providers: [MessageService],
})
export class ComponentsModule {}
