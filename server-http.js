const http = require("http");

const PORT = 3000;

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.end("Hello from the Node.js HTTP server!");
});

server.listen(PORT, () => {
    console.log(`HTTP server running at http://localhost:${PORT}`);
});
