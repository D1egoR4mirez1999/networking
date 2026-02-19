const dgram = require("node:dgram");

const PORT = 8000;
const HOST = "::1";
const socket = dgram.createSocket("udp6");

socket.send("Hello from sender 1", PORT, HOST, (err) => {
  if (err) {
    return console.error("Error sending message", err);
  }
});
