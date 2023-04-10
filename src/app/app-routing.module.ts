import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreatePortfolioComponent} from "./create-portfolio/create-portfolio.component";
import {PortfoliosListComponent} from "./portfolios-list/portfolios-list.component";
import {PortfolioDetailsComponent} from "./portfolio-details/portfolio-details.component";

const routes: Routes = [
  {path:'', redirectTo:'create', pathMatch: 'full'},
  {path: 'create-portfolio', component: CreatePortfolioComponent},
  {path: 'portfolios-list', component: PortfoliosListComponent},
  {path: 'details/:id', component: PortfolioDetailsComponent},
  {path: 'update/:id', component: CreatePortfolioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
