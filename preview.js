const fs = require('fs');
const url = require('url');
const path = require('path');
const http = require('http');

const server = http.createServer(function (request, response) {
    console.log(request.method + ': ' + request.url);
    let pathname = url.parse(request.url).pathname;
    let filepath = path.join('build', pathname);
    fs.stat(filepath, function (err, stats) {
        if (!err) {
            if (stats.isFile()) {
                response.writeHead(200);
                fs.createReadStream(filepath).pipe(response);
            } else if (stats.isDirectory()) {
                let index = path.join(filepath, 'index.html');
                fs.access(index, (err) => {
                    if (err) {
                        response.writeHead(404);
                        response.end('404 Not Found');
                        return;
                    }
                    response.writeHead(200);
                    fs.createReadStream(index).pipe(response);
                })
            } else {
                response.writeHead(404);
                response.end('404 Not Found');
            }
        } else {
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('服务器正在 http://localhost:8080/ 上运行');