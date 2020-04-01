var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);

    if (q.pathname == "/search/" && req.method == "GET") {
        // Get parameter from URL
        var keyword = q.query.keyword;

        if (keyword) {
            // Get data from form using GET mothod
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write("<h3>Search Result:</h3>");
            res.write("<p>You search: <b>" + keyword + "</b></p>");
            res.write("<pre>Tidak ada hasil! Maaf website ini masih dalam pengembangan</pre>");
            res.end("<a href='/search/'>Kembali</a>");
        } else {
            // Show form search
            fs.readFile('search.html', (err, data) => {
                if (err) {
                    // Send error response
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    return res.end("404 Not Found");
                }
                // Send form search.html
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        }
    }
}).listen(8000);

console.log('Server is running on http://localhost:8000');