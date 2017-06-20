/*
Aufgabe: 10 - Client Server 
Name: Jonas Fehrenbach
Datum: 20.06.2017
Matrikel: 254667

Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
*/

console.log("Server starting");

import Http = require("http");
import Url = require("url");

interface AssocStringString {
    [key: string]: string;
}

let port: number = process.env.PORT;
if (port == undefined)
    port = 8100;

let server: Http.Server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);

function handleListen(): void {
    console.log("Listening on port: " + port);
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("Request received");

    console.log(_request.url);
    let query: AssocStringString = Url.parse(_request.url, true).query;
    console.log(query);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    let key: string;
    for (key in query) {
        console.log(key + ":" + query[key]);
    }
    
    //Ausgabe auf Heroku
    _response.write("Folgende Eissorten sind als Bestellung eingegangen: <br>");
    _response.write("Schokolade: " + query["Schokolade"] + "<br>");
    _response.write("Erdbeere: " + query["Erdbeere"] + "<br>");
    _response.write("Vanille: " + query["Vanille"] + "<br>");
    _response.write("Banane: " + query["Banane"] + "<br>");
    _response.write("Karamell: " + query["Karamell"] + "<br>");
    _response.write("Zitrone: " + query["Zitrone"] + "<br>");
    _response.write("Mango: " + query["Mango"] + "<br>");
    _response.write("<br>");
    _response.write("Als Behaeltnis hast du " + query["Container"] + " gewaehlt und als Toppings " + query["Darbietung"] + "<br>");
    _response.write("Die Bestellung wird an " + query["Email"] + " gesendet <br>");
    _response.end();
}
