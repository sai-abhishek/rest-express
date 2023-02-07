import { Schema } from "mongoose";

export const StudentSchema = new Schema({
  firstName: {
    type: "string",
    required: "Enter a first name",
  },
  lastName: {
    type: "string",
    required: "Enter a last name",
  },
  email: {
    type: "string",
  },
  subject: {
    type: "string",
  },
  phone: {
    type: Number,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
