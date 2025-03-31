const mongoose = require("mongoose");

const roomschema = new mongoose.Schema({
  imageurl: {
    type: [String],
    required: true,
  },
  currentbookings: [],
  name: {
    type: String,
    required: true,
  },
  maxcount: {
    type: Number,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  rentperday: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const roommodel = mongoose.model("roomtable", roomschema);

module.exports = roommodel;
