import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from '@spartacus/storefront';

import { SpartacusModule } from './spartacus/spartacus.module';

import { AppComponent } from './app.component';

import { externalModules } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreModule.forRoot({}), AppRoutingModule, EffectsModule.forRoot([]), SpartacusModule, ...externalModules],
  providers: [provideHttpClient(withFetch(), withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
