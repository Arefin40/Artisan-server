const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_DB_URI;
const databaseName = "arts_and_crafts";

const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   },
});

async function connectToDB() {
   try {
      await client.connect();
      console.log("Successfully connected to MongoDB!");
      return client.db(databaseName);
   } catch (error) {
      console.log(error.message);
   }
}

module.exports = { connectToDB };
