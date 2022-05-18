import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  // To make the application navigate to the dashboard automatically
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  // The colon (:) character in the path indicates that :id is a placeholder for a specific hero id
  { path: 'detail/:id', component: HeroDetailComponent },
];

// The @NgModule metadata initializes the router and starts it listening for browser location changes
@NgModule({
  // The method is called forRoot() because you configure the router at the application's root level
  // The forRoot() method supplies the service providers and directives needed for routing, and performs the initial navigation based on the current browser URL
  imports: [RouterModule.forRoot(routes)],
  // So it will be available throughout the application
  exports: [RouterModule],
})
export class AppRoutingModule {}
