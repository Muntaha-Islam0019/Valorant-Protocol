import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  // The hero property must be an Input property, annotated with the @Input() decorator, because the external HeroesComponent will bind to it
  @Input() hero?: Hero;

  constructor(
    // The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent
    private route: ActivatedRoute,
    // The HeroService gets hero data from the remote server and this component will use it to get the hero-to-display
    private heroService: HeroService,
    // You'll use it later to navigate back to the view that navigated here
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // The route.snapshot is a static image of the route information shortly after the component was created
    // The paramMap is a dictionary of route parameter values extracted from the URL
    // The "id" key returns the id of the hero to fetch
    // The JavaScript Number function converts the string to a number, which is what a hero id should be
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }
}
