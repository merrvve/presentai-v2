import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExtractpdfComponent } from './components/tools/extractpdf/extractpdf.component';
import { TextToPresentaitonComponent } from './components/tools/text-to-presentaiton/text-to-presentaiton.component';
import { ToolsListComponent } from './components/tools/tools-list/tools-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'extract-pdf', component: ExtractpdfComponent },
  { path: 'text-to-pptx', component: TextToPresentaitonComponent },
  { path: 'tools-list', component: ToolsListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
