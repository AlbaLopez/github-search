import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from "./components/search/search.component";
import {SearchResultsComponent} from "./components/search-results/search-results.component";

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'results',
    component: SearchResultsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
