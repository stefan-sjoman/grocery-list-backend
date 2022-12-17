const express = require("express");
const router = express.Router();

const dbFunction = require("../database.js");
const db = dbFunction();

router.get("/", async (req, res) => {
  const groceriesRef = db.collection("buyItems");
  let snapshot;
  try {
    snapshot = await groceriesRef.get();
  } catch (error) {
    console.log(error);
  }

  let myList = [];
  snapshot.forEach((docRef) => {
    myList = docRef.data();
  });

  console.log(myList);
  res.json(myList);
});

router.post("/", async (req, res) => {
  const object = req.body;
  try {
    await db.collection("buyItems").doc("myList").set(object);
    res.status(200).send("Item is added");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in database");
  }
});

router.delete("/", async (req, res) => {
  try {
    await db.collection("buyItems").doc("myList").delete();
    res.status(200).send("The list is deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in database");
  }
});

module.exports = router;
