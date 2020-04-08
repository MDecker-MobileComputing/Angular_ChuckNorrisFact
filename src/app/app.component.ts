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

  /** While this flag has the value "true" the button "Save as favorite" is made visible. */
  public showAddToFavoritesButton = false;

  /** While this flag has the value "true" the button "Remove from favorites" is made visible. */
  public showRemoveFromFavoritesButton = false;


  /**
   * Triggers fetching of first batch of jokes and injects two dependencies.
   *
   * @param icndbService  Object with logic for fetching and caching jokes from REST-API.
   *
   * @param favstoreService  Object for storing user's favorite jokes; must be public so
   *                         in the HTML file it can be referenced by interpolation.
   */
  constructor( private icndbService   : IcndbService,
               public  favstoreService: FavstoreService ){

    icndbService.fetchJokes();
  }


  /**
   * Event handler method for button "Show next joke".
   */
  public showNextJoke(): void {

    this.jokeObj = this.icndbService.getJoke();

    if ( this.jokeObj.isFilled() ) {

      this.showNoJokesWarning = false;

      if ( this.favstoreService.isAlreadyStored( this.jokeObj ) ) {

        this.showAddToFavoritesButton      = false;
        this.showRemoveFromFavoritesButton = true;

      } else {

        this.showAddToFavoritesButton      = true;
        this.showRemoveFromFavoritesButton = false;
      }

    } else { // empty joke

      this.showNoJokesWarning            = true;
      this.showAddToFavoritesButton      = false;
      this.showRemoveFromFavoritesButton = false;
    }

    if (this.favstoreService.storageIsSupported() == false) {

      this.showAddToFavoritesButton      = false;
      this.showRemoveFromFavoritesButton = false;
    }
  }


  /**
   * Event handler for button "Save as favorite":
   * Current joke is saved in localStorage.
   */
  public onButtonSaveJoke(): void {

    this.favstoreService.saveJoke( this.jokeObj );

    this.showAddToFavoritesButton      = false;
    this.showRemoveFromFavoritesButton = true;
  }


  /**
   * Event handler for button "Remove from favorites".
   * Current joke is removed from localStorage
   */
  public onButtonRemoveFromFavorites(): void {

    this.favstoreService.removeJoke( this.jokeObj );

    this.showAddToFavoritesButton      = true;
    this.showRemoveFromFavoritesButton = false;
  }

}
