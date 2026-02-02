const net = require("node:net");

const clients = [];

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const dataString = data.toString();
    const clientId = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-") + 1);

    clients.map((client) => {
      client.socket.write(`User ${clientId}: ${message}`);
    });
  });
});

server.on("connection", (socket) => {
  console.log("New connection established");

  const clientId = clients.length + 1;
  clients.push({ id: clientId, socket });

  socket.write(`id-${clientId}`);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server is running on ", server.address());
});
