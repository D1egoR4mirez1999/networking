const dgram = require("node:dgram");

const PORT = 8000;
const HOST = "::1";
const socket = dgram.createSocket("udp6");

socket.bind({ port: PORT, host: HOST });

socket.on("listening", () => {
  console.log("Server is running on ", socket.address());
});

socket.on("message", (msg, rinfo) => {
  console.log(`Message received from ${rinfo.address}:${rinfo.port}`, msg.toString());
});
