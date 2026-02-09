const net = require("node:net");
const fs = require("node:fs/promises");

const PORT = "4020";
const server = net.createServer();

server.on("connection", async (socket) => {
  const destinationFileHandle = await fs.open("./storage/destination.txt", "w");
  const destinationFile = destinationFileHandle.createWriteStream();

  socket.on("data", (data) => {
    destinationFile.write(data);
  });

  socket.on("end", () => {
    destinationFileHandle.close();
    console.log("File uploaded successfully");
  });
});

server.listen(PORT, () => {
  console.log("Server is running on ", server.address());
});
