const express = require("express");
const router = express.Router();
const lowdb = require("lowdb");
const { nanoid } = require("nanoid");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("server.json");
const database = lowdb(adapter);
var randomMinute = require("random-minute");

router.post("/", (request, response) => {
  const orderItem = request.body;
  const orderMin = randomMinute({ min: 1, max:15  })
  orderItem.id = nanoid();
  orderItem.ETA = `${orderMin} minutes`;
  console.log("order som läggs till", orderItem);
  const orders = database.get("orders").push(orderItem).write();
  console.log(orders);

  let result = {};
  result.success = true;
  result.orders = orders;
  response.json(result);
  
});

router.get("/:id", (request, response) => {
  const id = request.params.id;
  const orders = database.get("orders").value();
  const foundOrders = orders.filter((order) => order.accountId === id);
  response.send(foundOrders)
})

module.exports = router;
