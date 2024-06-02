import { NgModule } from '@angular/core';
import { NgOmniSearchComponent } from './ng-omni-search.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NgOmniSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NgOmniSearchComponent
  ]
})
export class NgOmniSearchModule { }
