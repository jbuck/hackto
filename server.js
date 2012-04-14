var express = require('express'),
    app = express.createServer();

app.use(express.static(__dirname + '/public'));

app.listen(8888, '127.0.0.1', function() {
  var addy = app.address();
  console.log('Server started on http://' + addy.address + ':' + addy.port);
  console.log('Press Ctrl+C to stop');
});
