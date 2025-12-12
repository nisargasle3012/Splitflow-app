import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    payerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    splitType: {
      type: String,
      enum: ["equal", "percentage", "exact"],
      required: true
    },
    participants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        share: {
          type: Number,
          required: true
        }
      }
    ],
    description: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
