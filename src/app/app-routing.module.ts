import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [{ path: 'heroes', component: HeroesComponent }];

// The @NgModule metadata initializes the router and starts it listening for browser location changes
@NgModule({
  // The method is called forRoot() because you configure the router at the application's root level
  // The forRoot() method supplies the service providers and directives needed for routing, and performs the initial navigation based on the current browser URL
  imports: [RouterModule.forRoot(routes)],
  // So it will be available throughout the application
  exports: [RouterModule],
})
export class AppRoutingModule {}
