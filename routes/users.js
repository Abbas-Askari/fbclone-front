var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/delete", (req, res, next) => {
  res.send("Delete your acc?");
});

module.exports = router;
