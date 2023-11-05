import mongoose from "mongoose";
import { schema } from "../_common/schema.models.js";
const Schema = mongoose.Schema;

// Create a schema for the User
const userSchema = new Schema({
  email: {
    unique: true,
    required: true,
    ...schema.email,
  },
  password: {
    required: true,
    ...schema.password,
  },
  img: {
    require: false,
    ...schema.avatar,
  },
  username: {
    require: false,
    unique: true,
    ...schema.username,
  },
});

// Create a model for the User
const User = mongoose.model("User", userSchema);

export default User;
