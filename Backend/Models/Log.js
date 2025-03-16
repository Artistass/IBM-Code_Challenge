import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
  },
  {
    collection: "logs",
  }
);

export default mongoose.model("Log", logSchema);
