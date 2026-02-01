const net = require("node:net");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(data.toString());
  });
});

server.listen(3000, "192.168.1.3", () => {
  console.log("Server is running ", server.address());
});