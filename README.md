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