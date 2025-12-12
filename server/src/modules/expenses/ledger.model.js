import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
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
    amount: {
      type: Number,
      required: true
    },
    expenseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
      required: true
    },
    type: {
      type: String,
      enum: ["expense", "settlement"],
      default: "expense"
    }
  },
  { timestamps: true }
);

export default mongoose.model("LedgerEntry", ledgerSchema);
