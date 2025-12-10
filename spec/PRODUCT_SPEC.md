# ✅ **spec/PRODUCT_SPEC.md**

```md
# PRODUCT SPEC — Splitwise-Style Expense Sharing App

---

## 1. 🎯 Purpose
A simple, scalable system for groups to share expenses, track balances, and settle debts with transparent history and minimal friction.

---

## 2. 📌 Core Features (MVP)

- User registration & login (JWT)
- Create groups and manage members
- Add expenses with multiple split types:
  - Equal  
  - Percentage  
  - Exact  
- Maintain immutable ledger entries
- Compute per-user balances
- Debt simplification logic
- Record settlement transactions
- Activity feed for major events

---

## 3. 📈 Success Metrics
- **95%** of expense creation flows complete without error  
- **100%** balance accuracy across test cases  
- API response time **< 200ms** for all standard operations  

---

## 4. 📦 MVP Scope

### ✅ **IN**
- Authentication  
- Groups  
- Expenses  
- Ledger logic  
- Balance calculation  
- Debt simplification  
- Settlements  
- Activity feed  
- Basic React UI  

### ❌ **OUT (Future enhancements)**
- Real-time notifications (WebSockets)  
- Image/file uploads  
- Multi-currency support  
- Friends module  
- Analytics & dashboards  

---

## 5. 🏗 Architecture Notes
- Modular monolith with clear, domain-based modules  
- MongoDB for flexible ledger & history storage  
- Immutable ledger entries ensure auditability  
- Stateless API (except for JWT authentication)  

---

## 6. 🧠 Tech Decision Log
- **Node.js + Express** → Fast API dev, large ecosystem  
- **MongoDB** → Flexible document structure  
- **React** → Component-based, scalable UI  
- **JWT** → Stateless, scalable auth  
- **Docker + AWS ECS** → Reliable deployments  
- **GitHub Actions** → Complete CI/CD automation  
