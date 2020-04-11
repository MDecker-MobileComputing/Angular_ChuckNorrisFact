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

  /** Pattern for regular expression to recognized localStorage Keys that consist only of numbers. */
  private static readonly REGEXP_ONLY_NUMBERS = new RegExp('^[0-9]+$');

  /** Flag is only true when current browser is supporting local storage. */
  private localStorageSupported = false;

  /** HashMap for storing favorite jokes "in memory", key is ID of joke. */
  private shadowStorageMap = new Map<number, Joke>();


  /**
   * Checks if localStorage is available in current browser.
   */
  constructor() {

    if (window.localStorage) {

      this.localStorageSupported = true;
      console.log('LocalStorage is supported in current browser.');

      this.readAllFavoritesFromLocalStorate();

    } else {

      this.localStorageSupported = false;
      console.log('LocalStorage is NOT supported in current browser, user will NOT be able to save his/her favorite jokes.');
    }
  }


  /**
   * Reads all jokes from localStorage and copies them in shadowStorageMap.
   * This method is to be called once immediately after the start of the application.
   */
  private readAllFavoritesFromLocalStorate() {

    for (let i = 0; i < window.localStorage.length; i++){

      const keyStr = window.localStorage.key(i);
      const jokeObjAsStr = window.localStorage.getItem(keyStr);

      if (FavstoreService.REGEXP_ONLY_NUMBERS.test(keyStr) === false) {

        console.log(`Skipping entry with non-number key "${keyStr}" while restoring from localStorage; content is: "${jokeObjAsStr}"`);
        continue;
      }

      const joke = new Joke('', 0);

      try {

        Object.assign( joke, JSON.parse(jokeObjAsStr) );

        this.shadowStorageMap.set( joke.getID(), joke );

        console.log(`Restored object from localStorage: ${joke}`);
      }
      catch (error) {

        console.log(`Error during retrieval of joke with key ${keyStr} from localStorage: ${error}`);
      }
    }
  }


  /**
   * Saves the joke. Call this method only when it was checked before that the joke is not already stored
   * as favorite.
   *
   * @param joke  Joke object to be saved.
   */
  public saveJoke(joke: Joke): void {

    if (this.localStorageSupported === false) {

      console.log('Internal error: Attempt to save joke, but browser does not support localStorage.');

    } else {

      this.shadowStorageMap.set(   joke.getID(), joke );
      window.localStorage.setItem( joke.getID() + '', JSON.stringify(joke) );

      console.log(`Joke with ID ${joke.getID()} saved as favorite, number of saved jokes is now ${this.shadowStorageMap.size}.`);
    }
  }


  /**
   * Remove a joke from the favorites.
   *
   * @param joke  Joke object to be removed from favorites.
   */
  public removeJoke(joke: Joke): void {

    this.removeJokeById( joke.getID() );
  }


  /**
   * Remove a joke from the favorites from which only the ID is known.
   *
   * @param jokeId  Number of joke to be removed from favorites.
   */
  public removeJokeById(jokeId: number): void {

    if (this.localStorageSupported === false) {

      console.log('Internal error: Attempt to remove joke, but browser does not support localStorage.');

    } else {

      const wasRemoved = this.shadowStorageMap.delete( jokeId );
      window.localStorage.removeItem( jokeId + '' );

      if (wasRemoved === true) {

        console.log(`Joke with ID ${jokeId} was removed from favorites, number of saved jokes is now ${this.shadowStorageMap.size}.`);

      } else {

        console.log('Internal error: Attempt to remove joke that was not stored.');
      }
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


  /**
   * Get array with all jokes stored in map.
   *
   * @return  Array with all jokes stored as favorites.
   */
  public getAllJokes(): Joke[] {

    const resultArray: Joke[] = [];

    this.shadowStorageMap.forEach((value: Joke, key: number) => {

      resultArray.push(value);
    });

    return resultArray;
  }


  /**
   * Get count of number of jokes stored in HashMap.
   *
   * @return  Number of jokes stored
   */
  public getNumberOfStoredJokes(): number {

    return this.shadowStorageMap.size;
  }


  /**
   * Deletes all favorites from localStorage and shadowStorageMap.
   */
  public deleteAllJokes(): void {

    this.shadowStorageMap = new Map<number, Joke>();

    if ( this.storageIsSupported() === false ) { return; }

    for (let i = 0; i < window.localStorage.length; i++){

      const keyStr = window.localStorage.key(i);

      if (FavstoreService.REGEXP_ONLY_NUMBERS.test(keyStr) === false) {

        localStorage.removeItem(keyStr);
      }
    }
  }

}
