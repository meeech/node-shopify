var http = require('http');
http.createServer(function (req, res) {
  console.log('->Incoming');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('ok\n');
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');
