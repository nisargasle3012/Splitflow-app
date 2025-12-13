import Settlement from "./settlement.model.js";
import LedgerEntry from "../expenses/ledger.model.js";
import Group from "../groups/group.model.js";

export const createSettlement = async (req, res) => {
  try {
    const { groupId, toUser, amount } = req.body;
    const fromUser = req.user.id;

    if (!groupId || !toUser || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (
      !group.members.includes(fromUser) ||
      !group.members.includes(toUser)
    ) {
      return res.status(403).json({ message: "Users not in same group" });
    }

    // Save settlement record
    const settlement = await Settlement.create({
      groupId,
      fromUser,
      toUser,
      amount
    });

    // Reverse ledger entry
    await LedgerEntry.create({
      groupId,
      fromUser: toUser, // reversed
      toUser: fromUser,
      amount,
      expenseId: settlement._id,
      type: "settlement"
    });

    return res.status(201).json({
      message: "Settlement recorded successfully",
      settlement
    });

  } catch (error) {
    console.error("Settlement Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
