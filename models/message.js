const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255
  },
  from: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  message: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 4020
  },
  total: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  date: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  cost: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  }
});

const Message = mongoose.model("Message", messageSchema);

function validateMessage(message) {
  const schema = {
    phone: Joi.string()
      .min(10)
      .max(50)
      .required(),
    from: Joi.string()
      .min(5)
      .max(255)
      .required(),
    message: Joi.string()
      .min(3)
      .max(4020)
      .required(),
    total: Joi.string()
      .min(1)
      .max(50)
      .required(),
    date: Joi.string()
      .min(5)
      .max(50)
      .required(),
    cost: Joi.string()
      .min(1)
      .max(50)
      .required()
  };

  return Joi.validate(message, schema);
}

exports.Message = Message;
exports.validate = validateMessage;
