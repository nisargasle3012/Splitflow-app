import Expense from "./expense.model.js";
import Group from "../groups/group.model.js";
import { createLedgerEntries } from "./ledger.utils.js";

export const addExpense = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { amount, splitType, participants, description } = req.body;
    const payerId = req.user.id;

    // Validate group membership
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (!group.members.includes(payerId))
      return res.status(403).json({ message: "You are not in this group" });

    // Validate sums
    const totalShare = participants.reduce((acc, p) => acc + p.share, 0);
    if (totalShare !== amount)
      return res.status(400).json({ message: "Shares must sum to total amount" });

    // Create expense
    const expense = await Expense.create({
      groupId,
      payerId,
      amount,
      splitType,
      participants,
      description
    });

    // Create ledger entries
    await createLedgerEntries(expense);

    return res.status(201).json({
      message: "Expense added successfully",
      expense
    });
  } catch (error) {
    console.error("Add Expense Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
