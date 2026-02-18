import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String },
  description: { type: String },
  additionalFields: { type: Map, of: String }, // <-- dynamic fields (like extra columns)
  createdBy: {
      userId: String,
      role: String // "admin" or "client"
    },
}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);
