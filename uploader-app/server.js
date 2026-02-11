const net = require("node:net");
const fs = require("node:fs/promises");

const PORT = "4020";

let socketInstance = null;
let destinationFileHandler = null;
let destinationFileStream = null;

const handleFileUpload = async (data) => {
  if (!destinationFileHandler) {
    const indexOfSeparator = data.indexOf("-------");
    const fileName = data.subarray(10, indexOfSeparator).toString();
    const dataToWrite = data.subarray(indexOfSeparator + 7);
    
    socketInstance.pause();
    destinationFileHandler = await fs.open(`./storage/${fileName}`, "w");
    destinationFileStream = destinationFileHandler.createWriteStream();
    destinationFileStream.write(dataToWrite);
    socketInstance.resume();

    destinationFileStream.on("drain", () => {
      socketInstance.resume();
    });

    return;
  }

  const canContinue = destinationFileStream.write(data);

  if (!canContinue) {
    socketInstance.pause();
  }
};

const server = net.createServer();

server.listen(PORT, () => {
  console.log("Server is running on ", server.address());
});

server.on("connection", async (socket) => {
  console.log("New connection established");
  
  socketInstance = socket;
  socketInstance.on("data", (data) => {
    handleFileUpload(data);
  });
  
  socketInstance.on("end", () => {
    console.log("File uploaded successfully");
  
    destinationFileHandler.close();
    socketInstance = null;
    destinationFileHandler = null;
    destinationFileStream = null;
  });
});
