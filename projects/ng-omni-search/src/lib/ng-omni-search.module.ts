import { NgModule } from '@angular/core';
import { NgOmniSearchComponent } from './ng-omni-search.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NgOmniSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NgOmniSearchComponent
  ]
})
export class NgOmniSearchModule { }
