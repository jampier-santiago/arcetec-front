// Packages
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

// Reducers
import { authReducer } from './auth/redux/auth.reducer';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Modules
import { PublicPagesModule } from './public-pages/public-pages.module';
import { LayoutsModule } from './layouts/layouts.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot({ auth: authReducer }),
    BrowserModule,
    AppRoutingModule,
    PublicPagesModule,
    LayoutsModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
