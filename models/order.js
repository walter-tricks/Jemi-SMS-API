const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  smsQuantity: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5
  },
  openingBalance: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 12
  },
  amount: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 25
  },
  closingBalance: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 12
  },
  date: {
    type: String,
    required: true
  }
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = {
    order: Joi.string()
      .min(5)
      .max(255)
      .required(),
    smsQuantity: Joi.string()
      .min(1)
      .max(5)
      .required(),
    openingBalance: Joi.string()
      .min(1)
      .max(12)
      .required(),
    amount: Joi.string()
      .min(1)
      .max(25)
      .required(),
    closingBalance: Joi.string()
      .min(1)
      .max(12)
      .required(),
    date: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(order, schema);
}

exports.Order = Order;
exports.orderSchema = orderSchema;
exports.validate = validateOrder;
