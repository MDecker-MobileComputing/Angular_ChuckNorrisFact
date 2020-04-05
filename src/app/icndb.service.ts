import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


/**
 * Instance of this service class performs the actual HTTP-GET requests to the REST-API.
 * Several random jokes are fetched at once and stored in a Queue.
 */
@Injectable({
  providedIn: 'root'
})
export class IcndbService {

  /** Number of jokes to fetch with one HTTP-GET request. */
  private static readonly BATCHSIZE_OF_JOKES = 5;

  /** URL of API endpoint to fetch random jokes; does not have slash at the end. */
  private static readonly BASE_URL_ENDPOINT = 'https://api.icndb.com/jokes/random';

  /** Constant to be set in constructor (therefore not declared as "static"). */
  private readonly URL_ENDPOINT;

  /** Array of strings acting as queue (first in, first out). */
  private jokeQueue: string[] = [];


  /**
   * Constructor for Dependency Injection, will also construct URL to be queried.
   *
   * @param httpClient  Object needed to perform HTTP requests, provided by Dependency Injection.
   */
  constructor(private httpClient: HttpClient) {

    this.URL_ENDPOINT = `${IcndbService.BASE_URL_ENDPOINT}/${IcndbService.BATCHSIZE_OF_JOKES}`;

    console.log(`URL of REST-API to be queried: ${this.URL_ENDPOINT}`);
  }


  /**
   * Pops one joke from the queue. Will trigger loading of next batch of jokes
   * when queue is empty after this.
   *
   * @return  Text of joke or message that currently no jokes are available.
   */
  public getJoke(): string {

    if ( this.jokeQueue.length === 0 ) {

      this.fetchJokes();
      return 'No jokes available, please try again in a few seconds.';
    }

    const joke = this.jokeQueue.shift(); // method "shift()" removes element from array
    console.log(`Fetched one joke, number of elements in queue is now ${this.jokeQueue.length}.`);

    if (this.jokeQueue.length === 0) {

      console.log('Queue of jokes is empty, will trigger fetching of next batch of jokes.');
      this.fetchJokes();
    }

    return joke;
  }


  /**
   * Method to fetch some random jokes with a HTTP-GET request.
   */
  public fetchJokes(): void {

    // { observe: 'response' } as configuration to get access to whole HTTP response.
    // https://brianflove.com/2018/09/03/angular-http-client-observe-response/

    const confObj: any = {};
    confObj.observe = 'response';

    this.httpClient.get(this.URL_ENDPOINT, confObj).subscribe((httpResponse) => {

        const httpResponseAny: any = httpResponse;

        const httpStatusCode = httpResponseAny.status;

        if (httpStatusCode !== 200) {

          const httpStatusText = httpResponseAny.statusText;

          console.log(`HTTP Status Code other than 200: ${httpStatusCode} (${httpStatusText})`);
          return;
        }

        const jsonPayload: any = httpResponseAny.body;
        const statusTextFromApi = jsonPayload.type;

        if (statusTextFromApi !== 'success') {

          console.log(`Status Text from REST-API other than "success": ${statusTextFromApi}`);
          return;
        }

        // Get array with objects of jokes
        const valueArray = jsonPayload.value;

        console.log(`Received batch of ${valueArray.length} jokes from REST-API.`);

        for (const jokeObject of valueArray) {

          let joke = jokeObject.joke;
          joke = joke.replace(/&quot\;/g, '"'); // replace &quot; with quotation mark

          this.jokeQueue.push(joke);
        }
    });

  } // fetchJokes()

}
