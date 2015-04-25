var http = require("http");
var port = process.env['PORT'] || 8080;

response.writeHead(302, {
  'Location': 'http://forums.telkostrasz.be/'
});
response.end();
