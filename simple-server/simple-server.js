const net = require("node:net");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(data.toString());
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server is running ", server.address());
});