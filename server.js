const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const url = "mongodb://mongo:27017";
const client = new MongoClient(url);

let db;

async function start() {

    await client.connect();
    console.log("Connected to MongoDB");

    db = client.db("practiceDB");

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

start();


app.post("/users", async (req, res) => {

    const user = req.body;

    const result = await db.collection("users").insertOne(user);

    res.json(result);
});



app.get("/users", async (req, res) => {

    const users = await db.collection("users").find().toArray();

    res.json(users);
});