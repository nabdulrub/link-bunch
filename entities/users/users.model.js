import mongoose from "mongoose";
import { username, password } from "../_common/schema.models.js";
const Schema = mongoose.Schema;

// Create a schema for the User
const userSchema = new Schema({
  username: {
    unique: true,
    required: true,
    ...username,
  },
  password: {
    required: true,
    ...password,
  },
});

// Create a model for the User
const User = mongoose.model("User", userSchema);

module.exports = User;
