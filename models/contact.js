const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
  organisation: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 25
  }
});

const Contact = mongoose.model("Contact", contactSchema);

function validateContact(contact) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    organisation: Joi.string()
      .min(3)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(10)
      .max(25)
      .required()
  };

  return Joi.validate(contact, schema);
}

exports.Contact = Contact;
exports.validate = validateContact;
