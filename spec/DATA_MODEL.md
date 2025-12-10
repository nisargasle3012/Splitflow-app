# Data Model (High-Level)

---

## 👤 User
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "passwordHash": String,
  "createdAt": Date
}

## 👥 Group
```json
{
  "_id": ObjectId,
  "name": String,
  "members": [userId],
  "createdBy": userId,
  "createdAt": Date
}

💸 Expense
{
  "_id": ObjectId,
  "groupId": groupId,
  "payerId": userId,
  "amount": Number,
  "splitType": "equal" | "percentage" | "exact",
  "participants": [
    { "userId": userId, "share": Number }
  ],
  "description": String,
  "createdAt": Date
}

📘 LedgerEntry
{
  "_id": ObjectId,
  "groupId": groupId,
  "fromUser": userId,
  "toUser": userId,
  "amount": Number,
  "expenseId": ObjectId,
  "type": "expense" | "settlement",
  "createdAt": Date
}

🤝 Settlement
{
  "_id": ObjectId,
  "groupId": groupId,
  "fromUser": userId,
  "toUser": userId,
  "amount": Number,
  "createdAt": Date
}

📝 Activity
{
  "_id": ObjectId,
  "groupId": groupId,
  "type": "expense" | "settlement" | "member_add" | "member_remove",
  "actor": userId,
  "metadata": Object,
  "createdAt": Date
}
