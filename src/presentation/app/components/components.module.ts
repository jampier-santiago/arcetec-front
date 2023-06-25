// Packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Components
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CardsComponent } from './cards/cards.component';
import { LoaderComponent } from './loader/loader.component';

// Serices
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [MenuBarComponent, CardsComponent, LoaderComponent],
  imports: [
    CommonModule,
    MenubarModule,
    CardModule,
    StoreModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  exports: [MenuBarComponent, CardsComponent, LoaderComponent],
  providers: [MessageService],
})
export class ComponentsModule {}
