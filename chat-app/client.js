const net = require("node:net");
const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection(
  { host: "127.0.0.1", port: 3000 },
  async () => {
    const message = await rl.question("Enter a message:");
    client.write(message);
  }
);

client.on("end", () => {
  console.log("Connection closed");
});

client.on("data", (data) => {
  console.log("Message: ", data.toString());
});
