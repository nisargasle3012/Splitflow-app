import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    actorUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: [
        "EXPENSE_ADDED",
        "SETTLEMENT_ACCEPTED",
        "SETTLEMENT_REJECTED"
      ],
      required: true
    },
    metadata: {
      type: Object
    }
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
