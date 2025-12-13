import GlobalSettlement from "./globalSettlement.model.js";
import Group from "../groups/group.model.js";
import User from "../users/user.model.js";

const enrichSettlement = async (s, viewerId) => {
  const counterpartyId =
    String(s.fromUser) === viewerId ? s.toUser : s.fromUser;

  const [counterparty, group] = await Promise.all([
    User.findById(counterpartyId).select("name"),
    Group.findById(s.groupId).select("name")
  ]);

  return {
    id: s._id,
    amount: s.amount,
    status: s.status,
    description: s.description,
    groupId: s.groupId,
    groupName: group?.name,
    counterpartyId,
    counterpartyName: counterparty?.name,
    createdAt: s.createdAt,
    resolvedAt: s.resolvedAt
  };
};

export const getInitiatedSettlements = async (req, res) => {
  try {
    const userId = req.user.id;

    const settlements = await GlobalSettlement.find({
      fromUser: userId,
      status: "PENDING"
    }).sort({ createdAt: -1 });

    const result = [];
    for (const s of settlements) {
      result.push(await enrichSettlement(s, userId));
    }

    res.json({ settlements: result });

  } catch (error) {
    console.error("Fetch Initiated Settlements Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getActionRequiredSettlements = async (req, res) => {
  try {
    const userId = req.user.id;

    const settlements = await GlobalSettlement.find({
      toUser: userId,
      status: "PENDING"
    }).sort({ createdAt: -1 });

    const result = [];
    for (const s of settlements) {
      result.push(await enrichSettlement(s, userId));
    }

    res.json({ settlements: result });

  } catch (error) {
    console.error("Fetch Action Required Settlements Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCompletedSettlements = async (req, res) => {
  try {
    const userId = req.user.id;

    const settlements = await GlobalSettlement.find({
      status: { $in: ["ACCEPTED", "REJECTED"] },
      $or: [{ fromUser: userId }, { toUser: userId }]
    }).sort({ resolvedAt: -1 });

    const result = [];
    for (const s of settlements) {
      result.push(await enrichSettlement(s, userId));
    }

    res.json({ settlements: result });

  } catch (error) {
    console.error("Fetch Completed Settlements Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
