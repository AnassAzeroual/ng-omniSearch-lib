import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgOmniSearchModule } from 'projects/ng-omni-search/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,NgOmniSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
