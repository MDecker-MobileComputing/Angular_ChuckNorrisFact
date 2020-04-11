import { Component } from '@angular/core';
import { FavstoreService } from '../favstore.service';

/**
 * Component for page that shows list of all favorites.
 */
@Component({
  selector: 'mide-favorites',
  templateUrl: './favorites.component.html',
  styles: [
  ],
})
export class FavoritesComponent {

  /** Constructor for Dependency Injection. */
  constructor(public favstoreService: FavstoreService) { }


  /**
   * Event handler to remove joke from list of favorites.
   *
   * @param id  ID of joke to be removed
   */
  public onButtonRemoveFromFavoritesById(id: number): void {

    this.favstoreService.removeJokeById(id);
  }

}
