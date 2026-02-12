const net = require("node:net");
const fs = require("node:fs/promises");
const path = require("node:path");

const PORT = "4020";
const HOST = "::1";

const clearLine = (dir) => {
  return new Promise((resolve) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (left, top) => {
  return new Promise((resolve) => {
    process.stdout.moveCursor(left, top, () => {
      resolve();
    });
  });
};

const client = net.createConnection({ host: HOST, port: PORT }, async () => {
  const filePath = process.argv[2];
  const fileName = path.basename(filePath);
  
  client.write(`filaName: ${fileName}-------`);
  
  const sourceFileHandler = await fs.open(filePath, "r");
  const sourceFileStream = sourceFileHandler.createReadStream();
  const sourceFileSize = (await sourceFileHandler.stat()).size;
  
  let bytesWritten = 0;
  let percentage = 0;
  console.log();
  
  sourceFileStream.on("data", async (data) => {
    const canContinue = client.write(data);

    bytesWritten += data.length;
    percentage = Math.round((bytesWritten / sourceFileSize) * 100);
    
    await moveCursor(0, -1);
    await clearLine(0);
    console.log(`Uploading... ${percentage}%`);
    
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
