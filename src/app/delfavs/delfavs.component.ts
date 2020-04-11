import { Component, OnInit } from '@angular/core';
import { FavstoreService } from '../favstore.service';
import { Router } from '@angular/router';

/**
 * Component for page acting as confirmation question for deletion of all favorites.
 */
@Component({
  selector: 'mide-delfavs',
  templateUrl: './delfavs.component.html',
  styles: []  
})
export class DelfavsComponent {

  /** Constructor for Dependency Injection. */
  constructor(public favstoreService: FavstoreService, 
              private router: Router) { }

  /**
   * Event handler for button "Yes, go ahead".
   * Performs the actual deletion and then goes back to main page.
   */
  public onButtonDeleteAllFavorites(): void {

    this.favstoreService.deleteAllJokes();

    this.router.navigate(['/']);
  }

}
