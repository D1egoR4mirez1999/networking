const http = require("node:http");

const port = 8000;
const hostname = "localhost";

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello World from Diego's Node.js Server'" }));
});

server.listen(port, hostname, () => {
    console.log(`Server is running on ${hostname}:${port}`);
});

