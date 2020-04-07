import { Injectable } from '@angular/core';
import { Joke } from './joke';


/**
 * Service class to store user's favorite jokes in the browser's localStorage.
 * Tutorial on using localStorage: https://alligator.io/js/introduction-localstorage-sessionstorage/
 *
 * For performance reasons the stored favorites are also stored in a "shadow" map.
 */
@Injectable({
  providedIn: 'root'
})
export class FavstoreService {

  /** Flag is only true when current browser is supporting local storage. */
  private localStorageSupported = false;

  /** HashMap for storing favorite jokes "in memory", key is ID of joke. */
  private shadowStorageMap = new Map<number,Joke>();


  /**
   * Checks if localStorage is available in current browser.
   */
  constructor() {

    if (window.localStorage) {

      this.localStorageSupported = true;
      console.log('LocalStorage is supported in current browser.');

      // fill shadowStorageMap

    } else {

      this.localStorageSupported = false;
      console.log('LocalStorage is NOT supported in current browser, user will NOT be able to save his/her favorite jokes.');
    }
  }


  /**
   * Save joke. Call this method only when it was checked before that the joke is not already stored
   * as favorite.
   *
   * @param joke  Joke object to be saved.
   */
  public saveJoke(joke: Joke): void {

    if (this.localStorageSupported === false) {

      console.log('Internal error: Attempt to save joke, but browser does not support localStorage.');

    } else {

      this.shadowStorageMap.set( joke.getID(), joke );
      //localStorage.setItem("lastJoke", joke);
      console.log(`Joke with ID ${joke.getID()} saved as favorite.`);
    }
  }

  public removeJoke(joke: Joke): void {

    if (this.localStorageSupported === false) {

      console.log('Internal error: Attempt to remove joke, but browser does not support localStorage.');

    } else {

      let wasRemoved = this.shadowStorageMap.delete( joke.getID() );

      if (wasRemoved === true) {

        console.log(`Joke with ID ${joke.getID()} was removed from favorites.`);

      } else {

        console.log('Internal error: Attempt to remove joke that was not stored.');
      }

      //this.shadowStorageMap.set( joke.getID(), joke );
    }
  }


  /**
   * Check if joke is already stored as favorite.
   *
   * @param joke  Joke for which it is to be checked if it is already stored as favorite.
   *
   * @return  true iff joke is already stored.
   */
  public isAlreadyStored(joke: Joke): boolean {

    if (this.localStorageSupported === false) {

      console.log('Internal error: Query if joke is already stored, but browser does not support localStorage.');
      return false;
    }

    return this.shadowStorageMap.has( joke.getID() );
  }


  /**
   * Method to query if current browser supports localStorage. If localStorage is not supported,
   * then UI must not offer to save favorite jokes or to display them.
   *
   * @return When localStorage is not supported by the current browser, then false is returned.
   */
  public storageIsSupported(): boolean {

    return this.localStorageSupported;
  }

}
