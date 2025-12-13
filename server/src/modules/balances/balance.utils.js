import LedgerEntry from "../expenses/ledger.model.js";

export const computeRawBalances = async (groupId) => {
  const ledger = await LedgerEntry.find({ groupId });

  const balanceMap = {}; // {userId: netAmount}

  ledger.forEach(entry => {
    const from = String(entry.fromUser);
    const to = String(entry.toUser);
    const amt = entry.amount;

    balanceMap[from] = (balanceMap[from] || 0) - amt;
    balanceMap[to] = (balanceMap[to] || 0) + amt;
  });

  return balanceMap;  
};


export const simplifyBalances = (balanceMap) => {
  const debtors = [];
  const creditors = [];

  // Split people into two lists
  for (const userId in balanceMap) {
    const amt = balanceMap[userId];
    if (amt < 0) debtors.push({ userId, amount: amt });
    if (amt > 0) creditors.push({ userId, amount: amt });
  }

  const settlements = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const settleAmount = Math.min(-debtor.amount, creditor.amount);

    settlements.push({
      from: debtor.userId,
      to: creditor.userId,
      amount: settleAmount
    });

    // update balances
    debtor.amount += settleAmount;
    creditor.amount -= settleAmount;

    if (debtor.amount === 0) i++;
    if (creditor.amount === 0) j++;
  }

  return settlements;
};
