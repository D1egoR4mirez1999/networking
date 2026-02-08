const http = require("node:http");

const port = 8000;

const server = http.createServer((req, res) => {
    const data = { message: "Hello World" };

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Connection", "close");
    res.statusCode = 200;
    res.end(JSON.stringify(data));
});

server.listen(port, () => {
    console.log(`Server is running on `, server.address());
});

