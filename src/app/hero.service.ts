// Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data
// They should focus on presenting data and delegate data access to a service
// Services are a great way to share information among classes that don't know each other
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';

// This marks the class as one that participates in the dependency injection system
// The @Injectable() decorator accepts a metadata object for the service
// When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() {}

  // HttpClient.get<Hero[]>() which also returns an Observable<Hero[]> that emits a single value, an array of heroes from the body of the HTTP response
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }
}
