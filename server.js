const express = require("express");
const dotev = require("dotenv");
const db = require("./models");
const authRoute = require("./routes/authRoute");
const emojiRoute = require("./routes/emojiRoute");

const app = express();
dotev.config();
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/emoji", emojiRoute);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, (err) => {
    if (err) console.log("Error while connecting to the database");
    console.log("Server is up and running");
  });
});
