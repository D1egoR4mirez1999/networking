const net = require("node:net");
const fs = require("node:fs/promises");
const path = require("node:path");

const PORT = "4020";
const HOST = "::1";

const client = net.createConnection({ host: HOST, port: PORT }, async () => {
  const filePath = process.argv[2];
  const fileName = path.basename(filePath);
  
  client.write(`filaName: ${fileName}-------`);
  
  const sourceFileHandler = await fs.open(filePath, "r");
  const sourceFileStream = sourceFileHandler.createReadStream();
  
  sourceFileStream.on("data", (data) => {
    const canContinue = client.write(data);
    
    if (!canContinue) {
      sourceFileStream.pause();
    }
  });

  client.on("drain", () => {
    sourceFileStream.resume();
  });

  sourceFileStream.on("end", () => {
    client.end();
  });
});
