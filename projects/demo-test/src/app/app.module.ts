import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgOmniSearchModule } from 'ng-omni-search';

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
