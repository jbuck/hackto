var express = require('express'),
    app = express.createServer(),
    httpProxy = require('http-proxy');

app.use(express.static(__dirname + '/public'));

httpProxy.createServer(function(req, res, proxy) {
  req.headers.host = 'multicolorengine.tineye.com';

  if (req.url.indexOf('hackdays_flickr') != -1) {
    proxy.proxyRequest(req, res, {
      host: 'multicolorengine.tineye.com',
      port: 80
    });
  } else {
    proxy.proxyRequest(req, res, {
      host: 'localhost',
      port: 8989
    });
  }
}).listen(8888);

app.listen(8989, '127.0.0.1', function() {
  var addy = app.address();
  console.log('Server started on http://localhost:8888');
  console.log('Press Ctrl+C to stop');
});
