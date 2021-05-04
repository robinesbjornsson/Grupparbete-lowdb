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

  const orders = database.get("orders");

  //  if (order.accountId === id) {
  //    console.log(id, "funkar");
  //  }

  const foundOrders = orders.filter((order) => order.accountId === id);
  
  console.log(foundOrders)

  // console.log(order.accountId === id
  // console.log(orders)    orders.accountId === id
  //   let filteredOrders = router.get('orders').filter({ id: accountId })

  let result = {};
  result.success = true;
  result.foundOrder = foundOrders;
  // result.filteredOrders = filteredOrders;
  response.json(result, "hejhej");
})

module.exports = router;
