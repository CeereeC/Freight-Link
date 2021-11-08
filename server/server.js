const express = require("express");
const path = __dirname + "/views/build/";

const app = express();
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const _ = require("lodash");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});
app.use(express.static(path));
app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User ${socket.id} has joined`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

const url = "mongodb://localhost:27017/tranDB";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Items Schema

const transactionSchema = new mongoose.Schema({
  senderID: String,
  recipientID: String,
  vin: String,
  units: Number,
  loan_duration: Number,
  payment: Number,
  time: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("transactions", transactionSchema);

app.get("/t", function (req, res) {
  console.log("Server connected to Client");
  Transaction.find({}, (err, transactions) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ transactions: transactions });
    }
  });
});

let verity = 0;

app.post("/", (req, res) => {
  if ((verity + 1) % 3 == 0) {
    console.log("Done");
    const transaction = req.body;
    console.log(transaction);
    const newTransaction = new Transaction({
      senderID: transaction.senderID,
      recipientID: transaction.recipientID,
      vin: transaction.vin,
      units: transaction.units,
      loan_duration: transaction.loan_duration,
      payment: transaction.payment,
    });
    newTransaction.save();
    res.json({ msg: "success", newTrans: newTransaction });
  } else {
    console.log(req.body);
    verity += 1;
    console.log("Not yet");
  }
});

let port = 3000;
if (port === null || port === "") {
  port = 8080;
}
server.listen(port, () => {
  console.log("Server running");
});
