import mongoose from "mongoose";
import validator from "validator";

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
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Invalid Email format : " + value);
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 16,
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
      validate: {
        validator: function (value) {
          return ["male", "female"].includes(value);
        },
        message: "There are only 2 genders (male & female)",
      },
      default: "male",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
