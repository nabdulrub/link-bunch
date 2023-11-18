import mongoose from "mongoose";
import { schema } from "../_common/schema.models.js";
const Schema = mongoose.Schema;

// Create a schema for the User
const linkSchema = new Schema({
  link: {
    required: true,
    ...schema.title,
  },
  platform: {
    required: true,
    ...schema.title,
  },
  userId: {
    require: true,
    ...schema.title,
  },
});

// Create a model for the User
const Link = mongoose.model("Link", linkSchema);

export default Link;
