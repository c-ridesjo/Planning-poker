var express = require("express");
var router = express.Router();
const connection = require("../conn");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});



module.exports = router;
