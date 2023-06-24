import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MenubarModule } from 'primeng/menubar';

// Components
import { MenuBarComponent } from './menu-bar/menu-bar.component';

@NgModule({
  declarations: [MenuBarComponent],
  imports: [CommonModule, MenubarModule],
  exports: [MenuBarComponent],
})
export class ComponentsModule {}
