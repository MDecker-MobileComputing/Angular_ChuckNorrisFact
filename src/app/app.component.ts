import { Component } from '@angular/core';
import { IcndbService } from './icndb.service';


@Component({
  selector: 'mide-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  /** Current joke to be displayed on UI; referenced by {{ interpolation }} on HTML page. */
  public joke = '';

  /** While this flag has the value "true", a warning is made visible that says that currently no jokes are available. */
  public showNoJokesWarning = false;


  /**
   * Triggers fetching of first batch of jokes.
   *
   * @param icndbService  Object with logic for fetching and caching jokes from REST-API.
   */
  constructor(private icndbService: IcndbService){

    icndbService.fetchJokes();
  }


  /**
   * Event handler method for button "Show next joke".
   */
  public showNextJoke(): void {

    this.joke = this.icndbService.getJoke();

    this.showNoJokesWarning = ( this.joke === '' );
  }

}
