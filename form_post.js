var http = require('http');
var qs = require('querystring');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === '/login/' && req.method === "GET") {
        // Show login form
        fs.readFile('login_form.html', (err, data) => {
            if (err) {
                // Send error response
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end('404 Not Found');
            }
            // Send login_form.html form
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }

    if (req.url === '/login/' && req.method === 'POST') {
        // Get data form form and process
        var requestBody = '';
        req.on('data', function (data) {
            // Get data from form
            requestBody += data;

            // Send response if the data is too big
            if (requestBody.length > 1e7) {
                res.writeHead(413, 'Request Entity Too Large', { 'Content-Type': 'text/html' });
                res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
            }
        });

        // We are getting the data
        // Next step is patse it
        req.on('end', function () {
            var formData = qs.parse(requestBody);

            // Check login
            if (formData.username === 'petanikode' && formData.password === 'kopi') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h2>Welcome bos!</h2>');
                res.write('<p>username: ' + formData.username + '</p>');
                res.write('<p>password: ' + formData.password + '</p>');
                res.write("<a href='/login/'>back</a>");
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h2>Login Failed!');
                res.write("<a href='/login/'>Try again</a>");
                res.end();
            }
        })
    }
}).listen(8000);

console.log('Server is running on http://localhost:8000');