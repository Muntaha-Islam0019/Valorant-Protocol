// Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data
// They should focus on presenting data and delegate data access to a service
// Services are a great way to share information among classes that don't know each other
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

// This marks the class as one that participates in the dependency injection system
// The @Injectable() decorator accepts a metadata object for the service
// When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // Angular will inject the singleton MessageService into that property when it creates the HeroService
  // This is a typical "service-in-service" scenario
  // You inject the MessageService into the HeroService which is injected into the HeroesComponent
  constructor(private messageService: MessageService) {}

  // HttpClient.get<Hero[]>() which also returns an Observable<Hero[]> that emits a single value, an array of heroes from the body of the HTTP response
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('Fetched All Agents');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists
    // Error handling will be added in the next step of the tutorial
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`Fetched Agent ID=${id}`);
    return of(hero);
  }
}
