const express = require("express");
const router = express.Router();
const lowdb = require("lowdb");
const { nanoid } = require("nanoid");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("server.json");
const database = lowdb(adapter);
var randomMinute = require("random-minute");

router.post("/", (request, response) => {

  const newOrder = {
    id: nanoid(10),
    eta: randomMinute({ min: 1, max: 15 }),
    order: request.body.cart,
    userid: request.body.user
  }
  database.get("orders").push(newOrder).write();
  console.log(
    `new order created ${newOrder}`
  );

  response.json(newOrder);

});

router.get("/:id", (request, response) => {
  const id = request.params.id;
  const orders = database.get("orders").value();
  const foundOrders = orders.filter((order) => order.accountId === id);
  response.send(foundOrders)
})

module.exports = router;
