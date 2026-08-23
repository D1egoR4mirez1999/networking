const net = require("node:net");

const client = net.createConnection({ port: 3000, host: "localhost" }, () => {
    client.write("Hello from client");
});