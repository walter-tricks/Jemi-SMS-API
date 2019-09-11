const config = require("config");
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const orders = require("./routes/orders");
const contacts = require("./routes/contacts");
const messages = require("./routes/messages");
const express = require("express");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/jemi", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB.."));

app.use(express.json());
app.use("/api/v1/auth/signup", users);
app.use("/api/v1/auth/login", auth);
app.use("/api/v1/orders", orders);
app.use("/api/v1/contacts", contacts);
app.use("/api/v1/messages", messages);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
