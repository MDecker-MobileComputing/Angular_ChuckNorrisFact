import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mide-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  public witz = '';

  constructor(public httpClient: HttpClient){}

  /**
   * Event-Handler-Methode für Button.
   */
  sendeAnfrageAnWebAPI(): void {

    // const url = 'http://date.jsontest.com/';

    const url = 'https://api.icndb.com/jokes/random/';
    // Web-API muss in Response den Header "Access-Control-Allow-Origin: *"
    // zurückliefern, sonst blockiert der Browser wegen CORS Policy den Request
    //
    // Komplette HTTP-Response mit { observe: 'response' }:
    // https://brianflove.com/2018/09/03/angular-http-client-observe-response/

    this.httpClient.get(url, { observe: 'response' }).subscribe((httpResponse) => {

        console.log(`HTTP-Status: ${httpResponse.status}`);

        const responseBody: any = httpResponse.body;

        console.log(`API-Status: ${responseBody.type}`);

        this.witz = responseBody.value.joke;
    });

  }
}
