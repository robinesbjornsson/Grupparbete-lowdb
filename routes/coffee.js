const express = require("express");
const router = express.Router()
const lowdb = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("server.json");
const database = lowdb(adapter);



router.get("/", (req, res) => {

  const menu = database.get("menu").value();

//   if (menu.length > 0) {
//     result.success = true;
//     result.menu = menu;
//   } else {
//     result.success = false;
//     result.message = "inget kaffe att hämta ";
//   }
  // res.send("hello");
  res.send(menu)
//  res.json(menu);
});

module.exports = router; 