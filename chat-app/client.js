const net = require("node:net");
const readline = require("node:readline/promises");

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

const client = net.createConnection(
  { host: "127.0.0.1", port: 3000 },
  async () => {
    ask();
  }
);

client.on("end", () => {
  console.log("Connection closed");
});

client.on("data", async (data) => {
  console.log();
  await moveCursor(0, -1);
  await clearLine(0);

  if (data.toString().substring(0, 2) === "id") {
    clientId = data.toString().substring(3);
    console.log(`Your client ID is ${clientId}`);
  } else {
    console.log(data.toString());
  }

  ask();
});
