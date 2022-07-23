const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the activity model. */
const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Activity", activitySchema);
