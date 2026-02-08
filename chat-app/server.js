const net = require("node:net");

const PORT = "4020";
const HOST = "::1";

const clients = [];
const handleClientLeave = (clientId) => {
  clients.map((client) => {
    if (client.id !== clientId) {
      client.socket.write(`User ${clientId} left the chat`);
    }
  });
};
const handleClientJoin = (clientId) => {
  clients.map((client) => {
    if (client.id !== clientId) {
      client.socket.write(`User ${clientId} joined the chat`);
    }
  });
};

const server = net.createServer();

server.listen(PORT, HOST, () => {
  console.log("Server is running on ", server.address());
});

server.on("connection", (socket) => {
  console.log("New connection established");

  const clientId = clients.length + 1;
  const client = { id: clientId, socket };

  clients.push(client);
  handleClientJoin(client.id);

  socket.write(`id-${clientId}`);

  socket.on("end", () => {
    handleClientLeave(clientId);
  });

  socket.on("error", () => {
    handleClientLeave(clientId);
  });

  socket.on("data", (data) => {
    const dataString = data.toString();
    const clientId = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-") + 1);

    clients.map((client) => {
      client.socket.write(`User ${clientId}: ${message}`);
    });
  });
});
