import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TextToPresentaitonComponent } from './components/tools/text-to-presentaiton/text-to-presentaiton.component';
import { ToolsListComponent } from './components/tools/tools-list/tools-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TextToPresentaitonComponent,
    ToolsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
