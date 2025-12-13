import mongoose from "mongoose";

const globalSettlementSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: "Settlement payment"
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING"
    },
    resolvedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("GlobalSettlement", globalSettlementSchema);
