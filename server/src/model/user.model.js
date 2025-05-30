import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    password: {
      type: String,
      required: [true, "Password is required"],
      // select: false, // this will not return the password field when we query the user
    },
    position: {
      type: String,
      enum: [
        "Software Engineer L1",
        "Software Engineer L2",
        "Lead Software Engineer",
        "Project Manager",
        "QA"
      ],
      default: "Software Engineer L1",
    },
    refreshToken: {
      type: String,
    },
    skills: {
      type: [String], // this will create an array of strings for skills
      default: [], // set a default value for skills
    },
    likes: {
      type: String,
      default: "0", // set a default value for likes
    }
  },
  {
    timestamps: true, // this will create createdAt and updatedAt fields
  }
);


userSchema.pre('save',async function(next) {
  // Hash the password before saving the user
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  // Compare the provided password with the hashed password
  return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    }
  ); // create a new access token with the user id and secret key
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
          _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
        }
      ); // create a new refresh token with the user id and secret key
};

export const User = mongoose.model("User", userSchema);
