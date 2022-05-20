// Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data
// They should focus on presenting data and delegate data access to a service
// Services are a great way to share information among classes that don't know each other
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// This marks the class as one that participates in the dependency injection system
// The @Injectable() decorator accepts a metadata object for the service
// When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api

  // Angular will inject the singleton MessageService into that property when it creates the HeroService
  // This is a typical "service-in-service" scenario
  // You inject the MessageService into the HeroService which is injected into the HeroesComponent
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // HttpClient.get<Hero[]>() which also returns an Observable<Hero[]> that emits a single value, an array of heroes from the body of the HTTP response
  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    this.messageService.add('Fetched All Agents');
    // return heroes;
    /** GET heroes from the server */
    // All HttpClient methods return an RxJS Observable of something
    // To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator
    // The HeroService methods will tap into the flow of observable values and send a message, using the log() method, to the message area at the bottom of the page
    // They'll do that with the RxJS tap() operator, which looks at the observable values, does something with those values, and passes them along
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists
    // Error handling will be added in the next step of the tutorial
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`Fetched Agent ID=${id}`);
    return of(hero);
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
  }

  /**
   * Handle Http operation that failed
   * Let the app continue
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // Because each service method returns a different kind of Observable result, handleError() takes a type parameter so it can return the safe value as the type that the application expects
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
