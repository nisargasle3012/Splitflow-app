import LedgerEntry from "./ledger.model.js";

export const createLedgerEntries = async (expense) => {
  const { groupId, payerId, participants, _id: expenseId } = expense;

  const entries = participants
    .filter(p => String(p.userId) !== String(payerId)) // payer doesn't owe himself
    .map(p => ({
      groupId,
      fromUser: p.userId,
      toUser: payerId,
      amount: p.share,
      expenseId,
      type: "expense"
    }));

  await LedgerEntry.insertMany(entries);
};
