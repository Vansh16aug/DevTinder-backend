import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      match: /^[a-zA-Z\s\-]+$/,
    },
    lastName: {
      type: String,
      required: true,
      match: /^[a-zA-Z\s\-]+$/,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      required: true,
      default: "other",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
