require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const usermodel = require("./model/usermodel");
const emaivalidator = require("email-validator");
const bcrypt = require("bcrypt");
const roommodel = require("./model/roommodel");
const bookingmodel = require("./model/bookingmodel");
const moment = require("moment");

const Port = 3000;
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(bodyparser.json());
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
mongoose.connect(process.env.DATABASEMAINURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.post("/registeruser", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      message: "every field is mandatory",
    });
  }
  const validemail = emaivalidator.validate(email);
  if (!validemail) {
    res.status(400).json({
      message: "Enter valida email",
    });
  }
  try {
    const passdecode = await bcrypt.hash(password, 10);
    const result = new usermodel({ name, email, password: passdecode });
    const savetodb = await result.save();
    res.status(200).json({
      message: "User register successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occured during registratration",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usercheck = await usermodel.findOne({ email });
    if (!usercheck) {
      res.status(400).json({
        message: "Invalid credential",
      });
    }

    const passwordcheck = await bcrypt.compare(password, usercheck.password);
    if (!passwordcheck) {
      res.status(400).json({
        message: "Invalid credential",
      });
    }
    const token = jwt.sign(
      {
        userId: usercheck._id,
      },
      "Yourkey"
    );

    res.status(200).json({
      message: "user login successfully",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occured during login",
    });
  }
});

app.post("/room/roomadd", async (req, res) => {
  const {
    imageurl,
    currentbookings,
    name,
    maxcount,
    phonenumber,
    type,
    rentperday,
    description,
  } = req.body;

  try {
    const roomsave = new roommodel({
      imageurl,
      currentbookings,
      name,
      maxcount,
      phonenumber,
      type,
      rentperday,
      description,
    });
    const saveroomtodb = await roomsave.save();

    res.status(200).json({
      message: "Room added successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occured during room adding",
    });
  }
});

app.get("/room/roomget", async (req, res) => {
  try {
    const roomget = await roommodel.find({});
    res.json(roomget);
  } catch (error) {
    res.status(400).json({
      message: "An error occured during room fetching",
    });
  }
});
app.get("/room/roomgetbyid/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const roomget = await roommodel.findOne({ _id: roomId });
    res.json(roomget);
  } catch (error) {
    res.status(400).json({
      error: "An error occured during room fetching",
    });
  }
});

app.post("/room/roombooking", async (req, res) => {
  const {
    roomname,
    roomid,
    email,
    fromdate,
    todate,
    totaldays,
    totalamount,
    transactionid,
  } = req.body;

  try {
    const roombook = new bookingmodel({
      roomname,
      roomid,
      email,
      fromdate: moment(fromdate, "DD-MM-YYYY").format("DD-MM-YYYY"),
      todate: moment(todate, "DD-MM-YYYY").format("DD-MM-YYYY"),
      totaldays,
      totalamount,
      transactionid: "1525533",
    });
    const savebookingtodb = await roombook.save();

    const roomtmp = await roommodel.findOne({ _id: roomid });
    roomtmp.currentbookings.push({
      bookingid: savebookingtodb._id,
      fromdate: moment(fromdate, "DD-MM-YYYY").format("DD-MM-YYYY"),
      todate: moment(todate, "DD-MM-YYYY").format("DD-MM-YYYY"),
      userid: email,
      status: savebookingtodb.status,
    });
    await roomtmp.save();
    res.status(200).json({
      message: "Room booked successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occured during booking",
    });
  }
});

app.get("/room/bookingget", async (req, res) => {
  const emailcheck = req.query.email;
  try {
    const bookingfeatch = await bookingmodel.find({ email: emailcheck });
    res.status(200).json({
      message: "booking featch successfully",
      data: bookingfeatch,
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occured during booking fetch",
    });
  }
});

app.post("/room/bookingcancel", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const getbookingbyid = await bookingmodel.findOne({ _id: bookingid });
    getbookingbyid.status = "cancelled";
    await getbookingbyid.save();

    const getbookingbyroomid = await roommodel.findOne({ _id: roomid });
    const bookingcancelset = getbookingbyroomid.currentbookings;
    const canceltmp = bookingcancelset.filter(
      (b) => b.bookingid.toString() !== bookingid
    );
    getbookingbyroomid.currentbookings = canceltmp;

    await getbookingbyroomid.save();
    res.status(200).json({
      message: "booking cancelled successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occured during booking cancellation",
    });
  }
});
app.listen(Port, () => {
  console.log(`server is running on port number ${Port}`);
});
