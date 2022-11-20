const fs = require('fs');
const url = require('url');
const path = require('path');
const http = require('http');

const server = http.createServer(function (request, response) {
    console.log(request.method + ': ' + request.url);
    let pathname = url.parse(request.url).pathname;
    let filepath = path.join('build', pathname);
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        } else {
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://localhost:8080/');