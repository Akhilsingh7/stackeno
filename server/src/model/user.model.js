import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // this will create an index on the username field for faster searching
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      // select: false, // this will not return the password field when we query the user
    },

    
  },
  {
    timestamps: true, // this will create createdAt and updatedAt fields
  }
);

export const User = mongoose.model("User", userSchema);
