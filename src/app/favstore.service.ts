import { Injectable } from '@angular/core';


/**
 * Service class to store user's favorite jokes in the browser's localStorage.
 *     
 * Tutorial on using localStorage: https://alligator.io/js/introduction-localstorage-sessionstorage/
 */
@Injectable({
  providedIn: 'root'
})
export class FavstoreService {

  /** Flag is true iff current browser is supporting local storage. */
  private localStorageSupported = false;


  /**
   * Checks if localStorage is available in current browser.
   */
  constructor() { 

    if (window.localStorage) {

      this.localStorageSupported = true;
      console.log('LocalStorage is supported in current browser.');

    } else {

      this.localStorageSupported = true;
      console.log('LocalStorage is NOT supported in current browser, user will NOT be able to save if favorite jokes.');
    }
  }

  public storeJoke(joke: string): void {

    localStorage.setItem("lastJoke", joke);
  }

}
