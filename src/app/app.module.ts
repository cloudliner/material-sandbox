import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { SampleInnerComponent } from './sample-inner/sample-inner.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule
  ],
  declarations: [
    AppComponent,
    SampleInnerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
