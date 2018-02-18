import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { MatButtonModule } from '@angular/material';

import { FadeInComponent } from './fade-in.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    MatButtonModule
  ],
  declarations: [
    FadeInComponent
  ],
  exports: [
    FadeInComponent
  ]
})
export class FadeInModule { }
