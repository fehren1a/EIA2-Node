/*
Aufgabe: 10 - Client Server
Name: Jonas Fehrenbach
Datum: 20.06.2017
Matrikel: 254667

Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
*/
"use strict";
console.log("Server starting");
const Http = require("http");
const Url = require("url");
let port = process.env.PORT;
if (port == undefined)
    port = 8100;
let server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    console.log(_request.url);
    let query = Url.parse(_request.url, true).query;
    console.log(query);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    let key;
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
//# sourceMappingURL=NodeTest.js.map