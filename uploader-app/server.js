const net = require("node:net");
const fs = require("node:fs/promises");

const PORT = "4020";
const server = net.createServer();

server.listen(PORT, () => {
  console.log("Server is running on ", server.address());
});

server.on("connection", async (socket) => {
  console.log("New connection established");

  let destinationFileHandler = null;
  let destinationFileStream = null;

  const handleFileUpload = async (data) => {
    if (!destinationFileHandler) {
      const indexOfSeparator = data.indexOf("-------");
      const fileName = data.subarray(10, indexOfSeparator).toString();
      const dataToWrite = data.subarray(indexOfSeparator + 7);

      socket.pause();
      destinationFileHandler = await fs.open(`./storage/${fileName}`, "w");
      destinationFileStream = destinationFileHandler.createWriteStream();
      destinationFileStream.write(dataToWrite);
      socket.resume();

      destinationFileStream.on("drain", () => {
        socket.resume();
      });

      return;
    }

    const canContinue = destinationFileStream.write(data);

    if (!canContinue) {
      socket.pause();
    }
  };

  socket.on("data", (data) => {
    handleFileUpload(data);
  });

  socket.on("end", () => {
    console.log("File uploaded successfully");

    destinationFileHandler.close();
    destinationFileHandler = null;
    destinationFileStream = null;
  });
});
