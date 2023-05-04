var express = require("express");
var router = express.Router();
const connection = require("../conn");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        res.json({ status: "error", message: "Error querying database" });
      } else if (results.length === 0) {
        res.json({ status: "fail", message: "Incorrect username or password" });
      } else {
        res.json({ status: "success", message: "Login successful" });
      }
    }
  );
});

module.exports = router;
