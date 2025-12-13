import GlobalSettlement from "./globalSettlement.model.js";
import Group from "../groups/group.model.js";

export const initiateGlobalSettlement = async (req, res) => {
  try {
    const fromUser = req.user.id;
    const { toUser, groupId, amount, description } = req.body;

    if (!toUser || !groupId || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Validate group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Validate both users are in group
    if (
      !group.members.includes(fromUser) ||
      !group.members.includes(toUser)
    ) {
      return res.status(403).json({ message: "Users not in same group" });
    }

    const settlement = await GlobalSettlement.create({
      fromUser,
      toUser,
      groupId,
      amount,
      description
    });

    return res.status(201).json({
      message: "Settlement initiated successfully",
      settlement
    });

  } catch (error) {
    console.error("Initiate Global Settlement Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
