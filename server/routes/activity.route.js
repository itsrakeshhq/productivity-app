const express = require("express");

const {
  getActivities,
  addActivity,
} = require("../controllers/activity.controller");

const router = express.Router();

router.get("/activities", getActivities);
router.post("/activity", addActivity);

module.exports = router;
