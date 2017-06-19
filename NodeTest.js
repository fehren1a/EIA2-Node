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
    let key;
    for (key in query) {
        if (key != "flavours" && key != "FirstName" && key != "LastName" && key != "street" && key != "Email" && key != "ConeCup") {
            _response.write(key + "<br>");
        }
    }
    //console.log(key + ":" + query[key]);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write("Als Behaelter hast du " + query["ConeCup"] + " gewaehlt und als Topping " + query["Special"] + "<br>");
    _response.write("Die Bestellung wird an " + query["FirstName"] + " gesendet <br>");
    _response.end();
}
//# sourceMappingURL=NodeTest.js.map