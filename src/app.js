const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectToDB } = require("../db/database");

const app = express();

// middlewares
app.use(
   cors({ origin: ["http://localhost:5173", "https://artisan-d4db7.web.app"] })
);
app.use(express.json());

(async () => {
   const db = await connectToDB();

   // Collections
   const categoriesCollection = await db.collection("categories");
   const paintingsCollection = await db.collection("paintings");

   app.get("/", async (req, res) => {
      // fetch categories
      const categoriesCursor = await db.collection("categories").find();
      const categories = await categoriesCursor.toArray();
      res.send({ categories });
   });

   // ======== Categories endpoints ========
   app.post("/category", async (req, res) => {
      const result = await categoriesCollection.insertOne(req.body);
      res.send(result.insertedId);
   });

   // ======== art & crafts endpoints ========
   // ADD NEW PAINTING
   app.post("/paintings", async (req, res) => {
      const result = await paintingsCollection.insertOne(req.body);
      res.send(result);
   });

   // GET A PAINTING
   app.get("/paintings/:id", async (req, res) => {
      const painting = await paintingsCollection.findOne({
         _id: new ObjectId(req.params.id),
      });
      res.send(painting);
   });

   // GET PAINTINGS
   app.get("/paintings", async (req, res) => {
      const paintings = await paintingsCollection.find(req.query).toArray();
      res.send(paintings);
   });

   // UPDATE A PAINTING
   app.patch("/paintings/:id", async (req, res) => {
      const result = await paintingsCollection.updateOne(
         { _id: new ObjectId(req.params.id) },
         { $set: req.body }
      );
      res.send(result);
   });

   // DELETE A PAINTING
   app.delete("/paintings/:id", async (req, res) => {
      const result = await paintingsCollection.deleteOne({
         _id: new ObjectId(req.params.id),
      });
      res.send(result);
   });
})();

module.exports = app;
