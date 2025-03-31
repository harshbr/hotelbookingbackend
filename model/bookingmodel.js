const mongoose = require("mongoose");

const bookingschma = new mongoose.Schema(
  {
    roomname: {
      type: String,
      require: true,
    },
    roomid: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    fromdate: {
      type: String,
      require: true,
    },
    todate: {
      type: String,
      require: true,
    },
    totaldays: {
      type: Number,
      require: true,
    },
    totalamount: {
      type: Number,
      require: true,
    },
    transactionid: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "booked",
    },
  },
  {
    timestamps: true,
  }
);
const bookingmodel = mongoose.model("bookingtable", bookingschma);

module.exports = bookingmodel;
