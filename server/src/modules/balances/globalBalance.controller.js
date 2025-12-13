import Group from "../groups/group.model.js";
import User from "../users/user.model.js";
import { computeRawBalances, simplifyBalances } from "./balance.utils.js";

export const getGlobalBalance = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Find all groups user belongs to
    const groups = await Group.find({ members: userId });

    const liabilities = [];
    const receivables = [];

    for (const group of groups) {
      // 2. Compute balances for each group
      const raw = await computeRawBalances(group._id);
      const simplified = simplifyBalances(raw);

      for (const debt of simplified) {
        const { from, to, amount } = debt;

        // 3. If user owes someone
        if (from === userId) {
          const counterparty = await User.findById(to).select("name");

          liabilities.push({
            counterpartyId: to,
            counterpartyName: counterparty.name,
            groupId: group._id,
            groupName: group.name,
            amount,
            description: "Multiple expenses"
          });
        }

        // 4. If someone owes user
        if (to === userId) {
          const counterparty = await User.findById(from).select("name");

          receivables.push({
            counterpartyId: from,
            counterpartyName: counterparty.name,
            groupId: group._id,
            groupName: group.name,
            amount,
            description: "Multiple expenses"
          });
        }
      }
    }

    return res.json({
      liabilities,
      receivables
    });

  } catch (error) {
    console.error("Global Balance Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
