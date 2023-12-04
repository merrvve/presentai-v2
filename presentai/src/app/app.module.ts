import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TextToPresentaitonComponent } from './components/tools/text-to-presentaiton/text-to-presentaiton.component';
import { ToolsListComponent } from './components/tools/tools-list/tools-list.component';
import { HeroComponent } from './components/hero/hero.component';
import { ExtractpdfComponent } from './components/tools/extractpdf/extractpdf.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TextToPresentaitonComponent,
    ToolsListComponent,
    HeroComponent,
    ExtractpdfComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
