const config = require("config");
const _ = require("lodash");
const { Message, validate } = require("../models/message");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let message = await Message.findOne({ message: req.body.message });
  if (message)
    return res
      .status(400)
      .send("Message already sent wait 1 min to send another.");

  message = new Message(
    _.pick(req.body, ["phone", "from", "message", "total", "date", "cost"])
  );
  await message.save();
  console.log(message);

  //   let order = await Order.findOne({ orderId: req.body.orderId });
  //   if (order)
  //     return res.status(400).send("Order already sent try to create new one.");

  //   async function addOrder(userId, message) {
  //     const user = await User.findById(userId);

  //     user.messages.push(message);

  //     user.save(function(err, saved) {
  //       if (err) console.error(err);
  //     });
  //   }

  //   const userId = req.body.customerNo;

  //   message = new Message(
  //     _.pick(req.body, ["customerNo", "phone", "from", "message"])
  //   );
  //   addOrder(userId, message);

  res.send(
    _.pick(message, [
      "_id",
      "phone",
      "from",
      "message",
      "total",
      "date",
      "cost"
    ])
  );
});

module.exports = router;
