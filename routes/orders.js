const config = require("config");
const _ = require("lodash");
const { Order, validate } = require("../models/order");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let order = await Order.findOne({ smsQuantity: req.body.smsQuantity });
  if (order)
    return res
      .status(400)
      .send("Order already sent wait 1 min to send another.");

  order = new Order(
    _.pick(req.body, [
      "order",
      "smsQuantity",
      "openingBalance",
      "amount",
      "closingBalance",
      "date"
    ])
  );
  // order.push(order);
  // await order.save();
  order.save(function(err, saved) {
    if (err) console.error(err);
  });
  // console.log(order);

  //   let order = await Order.findOne({ orderId: req.body.orderId });
  //   if (order)
  //     return res.status(400).send("Order already sent try to create new one.");

  // async function validateIds() {
  //   const userIds = await User.findById(req.params.id);
  //   console.log(userIds);

  //   if (!userIds)
  //     return res.status(404).send("The genre with the given ID was not found.");
  //   console.log(userIds);
  //   return userIds;
  // }

  // async function addOrder(userId, order) {
  //   const user = await User.findById(userId);
  //   // console.log(order);
  //   user.orders.push(order);
  //   // console.log(user.orders);
  //   user.save(function(err, saved) {
  //     if (err) console.error(err);
  //   });
  // }

  // const userId = req.body.customerNo;
  // const userId = User.findById(req.params.id);
  // console.log(userId);
  // addOrder(userId, order);

  res.send(
    _.pick(order, [
      "_id",
      "order",
      "smsQuantity",
      "openingBalance",
      "amount",
      "closingBalance",
      "date"
    ])
  );
});
module.exports = router;
