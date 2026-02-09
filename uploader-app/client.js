const net = require("node:net");
const fs = require("node:fs/promises");

const PORT = "4020";
const HOST = "::1";

const client = net.createConnection({ host: HOST, port: PORT }, async () => {
  const sourceFileHandle = await fs.open("source.txt", "r");
  const sourceFile = sourceFileHandle.createReadStream();

  sourceFile.on("data", (data) => {
    client.write(data);
  });

  sourceFile.on("end", () => {
    client.end();
  });
});
