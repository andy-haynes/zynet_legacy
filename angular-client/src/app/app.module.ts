import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrewConfigComponent } from './brew-config/brew-config.component';
import { BrewConfigService } from './brew-config/brew-config.service';
import { WebsocketService } from './websocket/websocket.service';


@NgModule({
  declarations: [
    AppComponent,
    BrewConfigComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    BrewConfigService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
