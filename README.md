# Angular application to fetch Chuck Norris facts from icndb.com #

Simple [Angular](https://angular.io) application to fetch so called [Chuck Norris facts](https://en.wikipedia.org/wiki/Chuck_Norris_facts) (short jokes)
from the REST-API provided by [icndb.com](http://www.icndb.com/).

You can try out the application directly [**here**](https://mdecker-mobilecomputing.github.io/Angular_ChuckNorrisFacts/) via *GitHub Pages*.

<br>

----
## References ##

* [Description of REST-API provided by ICNDB](http://www.icndb.com/api/)
* File [ExampleResponseFromRestAPI.json](./ExampleResponseFromRestAPI.json) with an example for an response from the
  REST-API when request asked to return 5 random jokes.
* [Article on "Chuck Norris facts" on Wikipedia](https://en.wikipedia.org/wiki/Chuck_Norris_facts)
* [Tutorial on HTTP-GET requests in an Angular application](https://www.ahmedbouchefra.com/angular/angular-9-8-example-import-httpclientmodule-and-send-http-ajax-requests/)
* [Video "Chuck Norris facts read by Chuck Norris" on youtube.com](https://www.youtube.com/watch?v=kQmPMZeN7JQ)

<br>

----
## Building the application ##

Execute command `npm run build` to build the application.

The target folder for output of command `ng build` was moved to [docs](docs/) to enable serving of the generated application via [GitHub Pages](https://pages.github.com/), see key `architect/build/options/outputPath` in file [angular.json](angular.json).

<br>

File [manifest.json](src/manifest.json) will also be copied into the target folder because it is declared
as asset (see file [angular.json](angular.json) in the array with key `projects/architect/assets`).
This manifest file is referenced by a `<link>` in file [index.html](src/index.html).

----
## Internals ##

The actual loading of the jokes from the REST-API via HTTP is implemented in service class [icndb.service.ts](src/app/icndb.service.ts).
The jokes are not fetched individually, but in batches which are stored in an internal array that acts as queue.

For styling the [bootstrap](https://getbootstrap.com) framework is used.

This Angular application can access the REST-API from a different domains than it is served itself because the
HTTP response from the REST-API contains the HTTP header `Access-Control-Allow-Origin: *`.
Because of the HTTP header most browsers won't block the Ajax request made by this application despite its
violation of the *Same Origin Policy*.

The favorites are stored in the browser's *Local Storage*.

<br>

----
## License ##

See the [LICENSE file](LICENSE.md) for license rights and limitations (GPL v3) for the files in this repository.

The author of this application is *NOT* related to [The Internet Chuck Norris Database (icndb.com)](http://www.icndb.com/).
