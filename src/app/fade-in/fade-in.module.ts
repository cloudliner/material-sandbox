import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInComponent } from './fade-in.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FadeInComponent
  ],
  exports: [
    FadeInComponent
  ]
})
export class FadeInModule { }
