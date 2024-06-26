import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TextToPresentaitonComponent } from './components/tools/text-to-presentaiton/text-to-presentaiton.component';
import { ToolsListComponent } from './components/tools/tools-list/tools-list.component';
import { HeroComponent } from './components/hero/hero.component';
import { ExtractpdfComponent } from './components/tools/extractpdf/extractpdf.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { ReleaseComponent } from './components/release/release.component';
import { ContactComponent } from './components/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { LimitPipe } from './pipes/limit.pipe';
import { AboutComponent } from './components/about/about.component';
import { PubmedAbstractsComponent } from './components/tools/pubmed-abstracts/pubmed-abstracts.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { PdfDropDirective } from './directives/pdf-drop.directive';
import { ShareComponent } from './components/share/share.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TextToPresentaitonComponent,
    ToolsListComponent,
    HeroComponent,
    ExtractpdfComponent,
    FooterComponent,
    HomeComponent,
    FeaturedComponent,
    ReleaseComponent,
    ContactComponent,
    FilterPipe,
    LimitPipe,
    AboutComponent,
    PubmedAbstractsComponent,
    NewsletterComponent,
    PdfDropDirective,
    ShareComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ClipboardModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
