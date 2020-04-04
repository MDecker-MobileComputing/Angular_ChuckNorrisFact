# Rest-API von icndb mit Angular abfragen #


Tutorial für Implementierung HTTP-GET-Anfrage mit Angular:
https://www.ahmedbouchefra.com/angular/angular-9-8-example-import-httpclientmodule-and-send-http-ajax-requests/


Beispiel für JSON-Dokument, das für HTTP-Request an URL http://api.icndb.com/jokes/random/ zurückgeliefert wird:
````
{
    "type": "success",
    "value": {
        "id": 617,
        "joke": "Chuck Norris doesn't turn on his faucet, he stares at it until it cries.",
        "categories": []
    }
}
````

URL für Zugriff via "GitHub Pages":  https://mdecker-mobilecomputing.github.io/Angular_ChuckNorrisFact/icndbClient/index.html

Nachbearbeitung von mit `npm run build` erzeugte Datei [docs/icndbClient/index.html](docs/icndbClient/index.html):
Die folgenden Attribute sind aus den `<script>`-Tags zu entfernen:
* `type="module"`
* `defer`
* `nomodule`
