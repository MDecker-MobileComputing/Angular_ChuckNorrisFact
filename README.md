# Angular application to fetch Chuck Norris facts from icndb.com #

Simple [Angular](https://angular.io) application to fetch so called [Chuck Norris facts](https://en.wikipedia.org/wiki/Chuck_Norris_facts) (short jokes)
from the REST-API provided by [icndb.com](http://www.icndb.com/).

<br>

----
## References ##

* [Description of REST-API provided by ICNDB](http://www.icndb.com/api/)
* [Article on "Chuck Norris facts" on Wikipedia](https://en.wikipedia.org/wiki/Chuck_Norris_facts)
* [Tutorial on HTTP-GET requests in an Angular application](https://www.ahmedbouchefra.com/angular/angular-9-8-example-import-httpclientmodule-and-send-http-ajax-requests/)
* [Video "Chuck Norris facts read by Chuck Norris" on youtube.com](https://www.youtube.com/watch?v=kQmPMZeN7JQ)

<br>

----
## Building the application ##

Execute command `npm run build` to build the application.

The target folder for output of command `ng build` was moved to [docs](docs/) to enable serving of the generated application via [GitHub Pages](https://pages.github.com/), see key `architect/build/options/outputPath` in file [angular.json](angular.json).

Manual changes required in file `index.html` to enable direct opening of the application in a browser form the file system (i.e. NOT via HTTP): In the `<script>`-Tags all occurences of the following attributes are to be removed:
* `type="module"`
* `defer`
* `nomodule`

<br>

----
## License ##

See the [LICENSE file](LICENSE.md) for license rights and limitations (GPL v3)
for the files in this repository.

The author of this application is not related to [The Internet Chuck Norris Database (icndb.com)](http://www.icndb.com/).
