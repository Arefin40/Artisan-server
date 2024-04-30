const express = require("express");
const cors = require("cors");
const { connectToDB } = require("../db/database");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

(async () => {
   const db = await connectToDB();

   app.get("/", async (req, res) => {
      // fetch categories
      const categoriesCursor = await db.collection("categories").find();
      const categories = await categoriesCursor.toArray();
      res.send({ categories });
   });

   // ======== Categories ========
   app.post("/category", async (req, res) => {
      const result = await db.collection("categories").insertMany(req.body);
      res.send(result.insertedIds);
   });

   // ======== Add art & craft ========
   app.post("/paintings/add", async (req, res) => {
      const result = await db.collection("paintings").insertOne(req.body);
      res.send(result.insertedId);
   });
})();

module.exports = app;
