const express = require("express");
const router = express.Router();
const { getRoads } = require("../controllers/roads");

router.get("/roads", getRoads);

module.exports = router;