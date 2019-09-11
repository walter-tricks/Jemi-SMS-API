const config = require("config");
const _ = require("lodash");
const { Contact, validate } = require("../models/contact");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   let order = await Order.findOne({ orderId: req.body.orderId });
  //   if (order)
  //     return res.status(400).send("Order already sent try to create new one.");

  let contact = await Contact.findOne({ phone: req.body.phone });
  if (contact) return res.status(400).send("Contact already saved.");

  contact = new Contact(_.pick(req.body, ["name", "organisation", "phone"]));

  contact.save(function(err, saved) {
    if (err) console.error(err);
  });
  console.log(contact);

  // async function addContact(userId, contact) {
  //   const user = await User.findById(userId);
  //   // console.log(user._id);
  //   // if (!user._id)
  //   //   return res.status(404).send("The genre with the given ID was not found.");
  //   // // console.log(contact);
  //   user.contacts.push(contact);

  //   user.save(function(err, saved) {
  //     if (err) console.error(err);
  //   });
  // }

  // const userId = req.body.customerNo;

  // contact = new Contact(_.pick(req.body, ["name", "organisation", "phone"]));
  // addContact(userId, contact);

  res.send(_.pick(contact, ["_id", "name", "organisation", "phone"]));
});

module.exports = router;
