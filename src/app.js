const express = require("express");
const cors = require("cors");
const { connectToDB } = require("../db/database");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

(async () => {
   app.get("/", async (req, res) => {
      res.send("Hello World");
   });
})();

module.exports = app;
