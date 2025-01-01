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
  } catch {
    res.status(400).send("Error saving user");
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

app.patch("/edit", async (req, res) => {
  const id = req.body.id;
  // const changes = {
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   emailId: req.body.emailId,
  //   password: req.body.password,
  //   age: req.body.age,
  //   gender: req.body.gender,
  // };
  const changes = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, changes, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
