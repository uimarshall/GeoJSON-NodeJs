const express = require("express");
const router = express.Router();
const { getRoads, addRoads } = require("../controllers/roads");

router.get("/roads", getRoads);
router.post("/roads", addRoads);

module.exports = router;