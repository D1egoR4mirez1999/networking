const net = require("node:net");

const client = net.createConnection({ port: 3000, host: "192.168.1.3" }, () => {
    client.write("Hello from client");
});