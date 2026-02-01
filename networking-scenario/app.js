const http = require("node:http");

const port = 8000;
const hostName = "192.168.1.3";

const server = http.createServer((req, res) => {
    const data = { message: "Hello World" };

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Connection", "close");
    res.statusCode = 200;
    res.end(JSON.stringify(data));
});

server.listen(port, hostName, () => {
    console.log(`Server is running on http://${hostName}:${port}`);
});

