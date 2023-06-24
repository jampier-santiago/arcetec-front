// Packages
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Modules
import { PublicPagesModule } from './public-pages/public-pages.module';
import { LayoutsModule } from './layouts/layouts.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PublicPagesModule, LayoutsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
