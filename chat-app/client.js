const net = require("node:net");
const readline = require("node:readline/promises");

const PORT = "4020";
const HOST = "::1";

let clientId = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

const ask = async () => {
  const message = await rl.question("Enter a message> ");

  await moveCursor(0, -1);
  await clearLine(0);

  client.write(`${clientId}-${message}`);
};

const client = net.createConnection({ host: HOST, port: PORT });

client.on("end", () => {
  console.log("Connection closed");
});

client.on("data", async (data) => {
  console.log();
  await moveCursor(0, -1);
  await clearLine(0);

  const dataString = data.toString();
  const isIdMessage = dataString.substring(0, 2) === "id";

  if (isIdMessage) {
    clientId = dataString.substring(3);
    console.log(`Your client ID is ${clientId}`);
  } else {
    console.log(dataString);
  }

  ask();
});
