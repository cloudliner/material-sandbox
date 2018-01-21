import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { AppComponent } from './app.component';
import { MyFirstPanelComponent } from './my-first-panel/my-first-panel.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OverlayModule,
    PortalModule
  ],
  declarations: [
    AppComponent,
    MyFirstPanelComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MyFirstPanelComponent]
})
export class AppModule { }
