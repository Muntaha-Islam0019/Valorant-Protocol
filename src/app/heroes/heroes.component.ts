// Calling the members as heroes, as there are agents and radiants both, and obviously, they are heroes
import { Component, OnInit } from '@angular/core';

// @Component is a decorator function that specifies the Angular metadata for the component
// The CSS element selector, 'app-heroes', matches the name of the HTML element that identifies this component within a parent component's template
@Component({
  selector: 'app-heroes', // The component's CSS element selector
  templateUrl: './heroes.component.html', // The location of the component's template file
  styleUrls: ['./heroes.component.css'], // The location of the component's private CSS styles
})
export class HeroesComponent implements OnInit {
  // Always export the component class so you can import it elsewhere … like in the AppModule
  hero = 'Brimstone';

  constructor() {}

  // The ngOnInit() is a lifecycle hook
  // Angular calls ngOnInit() shortly after creating a component
  // It's a good place to put initialization logic
  ngOnInit(): void {}
}
