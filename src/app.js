import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  const existingUser = await User.findOne({ emailId: req.body.emailId });
  try {
    if (existingUser) {
      return res.status(400).send("User already found with same emailId");
    } else {
      await user.save();
      res.send("data saved");
    }
  } catch(err) {
    res.status(400).send(err.message);
  }
});

app.get("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong", err);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.patch("/edit/:id", async (req, res) => {
  const id = req.params?.id;
  const changes = req.body;
  try {
    const ALLOWED_UPDATES = ["firstName", "lastName", "age", "gender"];
    const isUpdateAllowed = Object.keys(changes).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) throw new Error("Update not allowed");
    const user = await User.findByIdAndUpdate(id, changes, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
