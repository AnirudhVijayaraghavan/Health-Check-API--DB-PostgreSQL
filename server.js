const http = require('http')

const server = http.createServer((request, response) => {
    console.log("Heard.")
    response.setHeader('Content-type', 'text/html');
    response.end('<h1>Hello</h1>');
    console.log('headers',request.headers)
    console.log('method',request.method)
    console.log('url',request.url)
})

server.listen(3000);