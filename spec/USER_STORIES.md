# User Stories (MVP)

---

## 1. 👤 User Registration & Login
**As a** new user  
**I want** to create an account and sign in  
**So that** I can access groups and expenses  

### ✅ Acceptance Criteria
- User registers with name, email, password  
- Login returns a JWT  
- Protected routes require valid JWT  

---

## 2. 👥 Create a Group
**As a** user  
**I want** to create a group and add members  
**So that** we can share expenses  

### ✅ Acceptance Criteria
- Group has name + members  
- Creator is group admin  
- Members can view the group  

---

## 3. 💸 Add an Expense
**As a** group member  
**I want** to add an expense with split type  
**So that** everyone pays their fair share  

### ✅ Acceptance Criteria
- Supports equal, percentage, and exact splits  
- Creates ledger entries  
- Adds activity feed entry  

---

## 4. 📊 View Group Balances
**As a** user  
**I want** to view who owes whom  
**So that** I understand outstanding balances  

### ✅ Acceptance Criteria
- Balance computed through ledger  
- Debt simplification applied  
- Clear API summary: who owes whom  

---

## 5. 🤝 Record Settlement
**As a** user  
**I want** to record a payment  
**So that** balances reflect real-world actions  

### ✅ Acceptance Criteria
- Reverse ledger entries created  
- Balances update  
- Activity feed entry created  

---

## 6. 📝 Activity Feed
**As a** group member  
**I want** to see recent actions  
**So that** I understand group history  

### ✅ Acceptance Criteria
- Shows expenses, settlements, membership changes  
- Sorted by timestamp  
- Supports pagination  
