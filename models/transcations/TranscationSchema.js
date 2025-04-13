import mongoose from "mongoose";

const TranscationSchema = mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    tdate: {
      type: Date,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Transcations", TranscationSchema);
