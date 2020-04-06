import { Component } from '@angular/core';
import { IcndbService } from './icndb.service';
import { FavstoreService } from './favstore.service';
import { Joke } from './joke';


@Component({
  selector: 'mide-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  /** Current joke to be displayed on UI; referenced by {{ interpolation }} on HTML page. */
  public jokeObj = new Joke('', 0);

  /** While this flag has the value "true", a warning is made visible that says that currently no jokes are available. */
  public showNoJokesWarning = false;


  /**
   * Triggers fetching of first batch of jokes.
   *
   * @param icndbService  Object with logic for fetching and caching jokes from REST-API.
   *
   * @param favstoreService  Object for storing user's favorite jokes
   */
  constructor( private icndbService: IcndbService,
               private favstoreService: FavstoreService ){

    icndbService.fetchJokes();
  }


  /**
   * Event handler method for button "Show next joke".
   */
  public showNextJoke(): void {

    this.jokeObj = this.icndbService.getJoke();

    this.showNoJokesWarning = this.jokeObj.isEmpty();
  }

}
