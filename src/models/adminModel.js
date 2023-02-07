import { Schema } from "mongoose";
import bcrypt from "bcrypt";

export const AdminSchema = new Schema({
  username: {
    type: "string",
    required: true,
  },
  hashPassword: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

AdminSchema.methods.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
