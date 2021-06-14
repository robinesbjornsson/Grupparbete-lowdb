const express = require("express");
const router = express.Router();
const lowdb = require("lowdb");
const { nanoid } = require("nanoid");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("server.json");
const database = lowdb(adapter);

router.post("/", (request, response) => {
  const newAccount = {
    id: nanoid(),
    userName: request.body.userName,
    password: request.body.password
  }

  database.get("accounts").push(newAccount).write();
  console.log(
    `Account created for user. Username: ${newAccount.userName}`
  );

  response.json(newAccount);
});

router.get("/:accountId", (request, response) => {
  const accountId = request.params.accountId;
  const accounts = database.get("accounts").value();
  const foundAccount = accounts.find((account) => account.id === accountId);

  response.send(foundAccount)
});

router.get("/", (request, response) => {
  const accounts = database.get("accounts").value();
  resquest.send(accounts)
});

module.exports = router;
