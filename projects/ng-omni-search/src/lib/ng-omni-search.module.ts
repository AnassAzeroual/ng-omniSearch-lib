import { NgModule } from '@angular/core';
import { NgOmniSearchComponent } from './ng-omni-search.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NgOmniSearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgOmniSearchComponent
  ]
})
export class NgOmniSearchModule { }
