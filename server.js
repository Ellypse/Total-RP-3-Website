var http = require("http");
var port = process.env['PORT'] || 8080;

http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end('<!DOCTYPE html><html><meta charset="utf-8"><title>It works' +
            "</title><b>Total RP 3</b><br /><br />Work in progress");
}).listen(port);
console.log("Server ready to accept requests on port %d", port);
