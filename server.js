const express = require("express");
const lowdb = require("lowdb");
const { nanoid } = require("nanoid");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("server.json");
const database = lowdb(adapter);

const coffeeRoutes = require('./routes/coffee')
const orderRoutes = require("./routes/order");
const accountRoutes = require("./routes/accounts");


const app = express();

app.use(express.json());
app.use("/api/coffee", coffeeRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/accounts", accountRoutes);

app.get('/api', (req, res) =>  res.send('hello from homepage. ')
)


app.listen(5000, () => {
  console.log("server started");
});

