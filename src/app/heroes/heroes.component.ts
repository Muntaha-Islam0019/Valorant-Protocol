// Calling the members as heroes, as there are agents and radiants both, and obviously, they are heroes
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
// import { MessageService } from '../message.service';

// @Component is a decorator function that specifies the Angular metadata for the component
// The CSS element selector, 'app-heroes', matches the name of the HTML element that identifies this component within a parent component's template
@Component({
  selector: 'app-heroes', // The component's CSS element selector
  templateUrl: './heroes.component.html', // The location of the component's template file
  styleUrls: ['./heroes.component.css'], // The location of the component's private CSS styles
})
export class HeroesComponent implements OnInit {
  // Always export the component class so you can import it elsewhere … like in the AppModule
  // hero: Hero = {
  //   id: 1,
  //   name: 'Brimstone',
  // };
  heroes: Hero[] = [];
  // selectedHero?: Hero;

  // The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site
  // Reserve the constructor for minimal initialization such as wiring constructor parameters to properties
  // The constructor shouldn't do anything
  constructor(
    private heroService: HeroService // private messageService: MessageService
  ) {}

  // The ngOnInit() is a lifecycle hook
  // Angular calls ngOnInit() shortly after creating a component
  // It's a good place to put initialization logic
  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`Selected Agent Name: ${hero.name}`);
  // }

  getHeroes(): void {
    // You're getting away with it now because the service currently returns mock heroes
    // The HeroService must wait for the server to respond, getHeroes() cannot return immediately with hero data, and the browser will not block while the service waits
    // HeroService.getHeroes() must have an asynchronous signature of some kind
    // this.heroes = this.heroService.getHeroes();

    // Waits for the Observable to emit the array of heroes —which could happen now or several minutes from now
    // The subscribe() method passes the emitted array to the callback, which sets the component's heroes property
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
