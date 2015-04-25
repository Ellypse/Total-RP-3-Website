var http = require("http");
var port = process.env['PORT'] || 8080;

http.createServer(function(req, res) {
    res.writeHead(302, {
	  'Location': 'http://forums.telkostrasz.be/'
	});
	res.end();
}).listen(port);
console.log("Server ready to accept requests on port %d", port);
