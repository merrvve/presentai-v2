import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ExtractpdfComponent } from './components/tools/extractpdf/extractpdf.component';
import { PubmedAbstractsComponent } from './components/tools/pubmed-abstracts/pubmed-abstracts.component';
import { TextToPresentaitonComponent } from './components/tools/text-to-presentaiton/text-to-presentaiton.component';
import { ToolsListComponent } from './components/tools/tools-list/tools-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'extract-pdf', component: ExtractpdfComponent },
  { path: 'text-to-pptx', component: TextToPresentaitonComponent },
  { path: 'pubmed-abstracts', component: PubmedAbstractsComponent },
  { path: 'tools-list', component: ToolsListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
