import GlobalSettlement from "./globalSettlement.model.js";
import LedgerEntry from "../expenses/ledger.model.js";
import Group from "../groups/group.model.js";

export const acceptGlobalSettlement = async (req, res) => {
  try {
    const userId = req.user.id;
    const { settlementId } = req.params;

    const settlement = await GlobalSettlement.findById(settlementId);
    if (!settlement) {
      return res.status(404).json({ message: "Settlement not found" });
    }

    // Only receiver can accept
    if (String(settlement.toUser) !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (settlement.status !== "PENDING") {
      return res.status(400).json({ message: "Settlement already resolved" });
    }

    // Create reverse ledger entry
    await LedgerEntry.create({
      groupId: settlement.groupId,
      fromUser: settlement.toUser,
      toUser: settlement.fromUser,
      amount: settlement.amount,
      expenseId: settlement._id,
      type: "settlement"
    });

    settlement.status = "ACCEPTED";
    settlement.resolvedAt = new Date();
    await settlement.save();

    return res.json({
      message: "Settlement accepted",
      settlement
    });

  } catch (error) {
    console.error("Accept Global Settlement Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const rejectGlobalSettlement = async (req, res) => {
  try {
    const userId = req.user.id;
    const { settlementId } = req.params;

    const settlement = await GlobalSettlement.findById(settlementId);
    if (!settlement) {
      return res.status(404).json({ message: "Settlement not found" });
    }

    // Only receiver can reject
    if (String(settlement.toUser) !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (settlement.status !== "PENDING") {
      return res.status(400).json({ message: "Settlement already resolved" });
    }

    settlement.status = "REJECTED";
    settlement.resolvedAt = new Date();
    await settlement.save();

    return res.json({
      message: "Settlement rejected",
      settlement
    });

  } catch (error) {
    console.error("Reject Global Settlement Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
