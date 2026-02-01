const net = require("node:net");

const clients = [];

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    clients.map((client) => {
      client.write(data.toString());
    });
  });
});

server.on("connection", (socket) => {
  console.log("New connection established");

  clients.push(socket);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server is running on ", server.address());
});
