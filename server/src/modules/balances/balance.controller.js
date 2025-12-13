import { computeRawBalances, simplifyBalances } from "./balance.utils.js";
import Group from "../groups/group.model.js";

export const getGroupBalance = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (!group.members.includes(userId))
      return res.status(403).json({ message: "Not authorized" });

    const raw = await computeRawBalances(groupId);
    const simplified = simplifyBalances(raw);

    return res.json({
      rawBalances: raw,
      simplifiedDebts: simplified
    });

  } catch (error) {
    console.error("Balance Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
