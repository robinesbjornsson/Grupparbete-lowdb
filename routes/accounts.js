const express = require("express");
const router = express.Router();
const lowdb = require("lowdb");
const { nanoid } = require("nanoid");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("server.json");
const database = lowdb(adapter);


router.post("/", (request, response) => {
    const account = request.body;
    account.accountId = nanoid();
    console.log(
      `Konto Skapat. Användarnamn: ${account.userName}, \n Lösenord: ${account.passWord}`
    );
    const accounts = database.get("accounts").push(account).write();
    console.log(accounts);

    let result = {};
    
    result.success = true;
    result.accounts = accounts;
    response.json(result);
});

router.get("/", (req, res) => {

  const accounts = database.get("accounts").value();
  res.send(accounts)
//  res.json(menu);
});

module.exports = router;
