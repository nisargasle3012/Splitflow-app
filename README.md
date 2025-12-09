# ⭐ SplitFlow — Expense Sharing & Group Balance Manager

A full-stack expense sharing system inspired by Splitwise, featuring group-based expense tracking, automated ledger calculations, balance simplification, and containerized deployment.

---

## 🚀 Features

- **Responsive React Frontend** for managing groups, adding expenses, viewing balances, and settling payments  
- **Dynamic UI updates** and clean user experience  
- **Secure JWT Authentication** for user login and protected routes  
- **Group-level expense management** with history tracking  
- **Ledger-based balance calculation** with equal / percentage / exact split support  
- **Debt simplification** for accurate and minimal settlements  
- **Dockerized frontend and backend** for portable deployments  

---

## 🛠 Tech Stack

### **Frontend**
- React  
- Axios  
- React Router  
- Docker  

### **Backend**
- Node.js  
- Express.js  
- JWT Authentication  
- MongoDB + Mongoose  
- Docker  

### **Core Logic**
- Ledger-based balance computation  
- Equal, Percentage, and Exact split models  
- Debt simplification algorithm  
- Multi-user consistent transactions  

### **DevOps & Deployment**
- Docker & Docker Compose  
- Environment-based configuration  

---

## 📦 Project Architecture

splitflow/
│
├── frontend/ # React UI for users
├── backend/ # Node.js + Express APIs
├── docker/ # Dockerfiles for services
├── .github/workflows # (Optional) CI/CD configurations
└── README.md


---

## 🔐 Authentication

- JWT-based login for secure sessions  
- Protected routes for groups & expenses  

---

## 📊 Ledger & Split Features

Powered by a **custom ledger engine**:

- Maintains per-user balances  
- Supports **equal split**, **percentage split**, and **exact amount split**  
- Simplifies debts across group members  
- Ensures consistent multi-user transactions  
- Handles complex multi-expense group scenarios  

---

## 👥 Expense Workflows

### **User Features**
- Create groups  
- Add shared expenses  
- View balances (who owes whom)  
- Settle payments quickly  
- View group expense history  

### **Backend Features**
- Accurate ledger state maintenance  
- Expense logs with metadata  
- Balance updates on every transaction  

---
# 📘 Splitwise-Style Expense Management System — Architecture Document

---

## 📌 1. Project Overview

This project is a full-stack expense-sharing application inspired by Splitwise.  
It allows users to create groups, add expenses, split costs (equal/custom), track balances, initiate settlements, and maintain a transparent activity feed.

The system is designed as a **modular monolith** with clean separation between:

- Expenses  
- Balances  
- Settlements  
- Groups  
- Users  
- Activity Feed  

---

## 📌 2. Core Problem Statement

The app solves the **net balance reconciliation problem** across users and groups.

**Expenses create imbalances → Settlements reduce them.**

The system supports:

- Equal or custom splits  
- Group-based ledgers  
- Pending → Accepted/Rejected settlement workflow  
- Transparent event feed  

---

## 📌 3. High-Level Features

- ✔ User authentication (JWT)  
- ✔ Create/manage groups  
- ✔ Add expenses (equal/custom split)  
- ✔ Automatic ledger (balance) calculation  
- ✔ Settlement initiation workflow  
- ✔ Settlement acceptance/rejection  
- ✔ WhatsApp-style group activity feed  
- ✔ Home summary: You owe / Others owe you  

---

## 📌 4. Application Screens (UX Flow)

### **1. Login**
- Email  
- Password  
- Login button  
- Signup link  

### **2. Signup**
- Name  
- Email  
- Password  
- Confirm Password  
- Create Account button  

### **3. Home**
- **Left:** Group list  
- **Center:**  
  - Total *You Owe*  
  - Total *Others Owe You*  
  - Buttons:  
    - Create Group  
    - Balance Summary  
    - Settlement Center  

### **4. Balance Window (Read-Only Summary)**
- Who owes you (across all groups)  
- Whom you owe (across all groups)  
- For “You Owe”:  
  - Input amount  
  - Pay button → initiates settlement  

### **5. Settlement Window**
Sections:  
- Incoming settlement requests (Accept/Reject)  
- Outgoing settlement requests  
- Completed settlements (accepted/rejected)  

📌 *Balances update only when settlement is accepted.*

---

### **6. Create Group**
- Group name  
- Add friends  
- Create Group button  

### **7. Group Window**
- Group header (name + 3-dot menu)  
- Chat-style feed:
  - Expenses  
  - Settlements  
  - Activity logs  
- Bottom bar:
  - Add Expense  
  - Owing  

### **8. Add Expense**
- Amount input  
- Equal / Custom split toggle  
- For equal: auto-filled split values  
- For custom: manual values + validation  
- Create Expense  

### **9. Group Owing Window**
Group-level ledger summary:
- Who owes you in this group  
- You owe whom in this group  
- *Pay* button → redirects to Settlement Window  

---

## 📌 5. MongoDB Collections (9 total)

### **1. users**
Stores user accounts.

### **2. friends**
User ↔ user relationships.

### **3. groups**
Stores group metadata.

### **4. group_members**
Membership list for each group.

### **5. expenses**
Stores each expense.

### **6. expense_splits**
Stores how each expense was divided.

### **7. balances**
Stores net balances between pairs of users per group.

Format:
fromUser → owes → toUser (amount)


### **8. settlements**
Handles pending/accepted/rejected settlement requests.

### **9. activities**
Unified event feed for each group  
(expense added, settlement accepted, member added, etc.)

---

## 📌 6. Backend API Specification (Summary)

### **Auth (Public)**
- POST `/auth/signup`  
- POST `/auth/login`  

### **User (Protected)**
- GET `/user/me`  
- GET `/user/friends`  
- POST `/user/friends/add`  

### **Groups (Protected)**
- POST `/groups`  
- GET `/groups`  
- GET `/groups/:groupId`  
- POST `/groups/:groupId/add-member`  
- POST `/groups/:groupId/remove-member`  
- GET `/groups/:groupId/members`  

### **Expenses (Protected)**
- POST `/groups/:groupId/expenses`  
- GET `/groups/:groupId/expenses`  

### **Balances (Protected)**
- GET `/groups/:groupId/balance`  
- GET `/balance/summary`  

### **Settlements (Protected)**
- POST `/settlements/initiate`  
- GET `/settlements/pending-incoming`  
- GET `/settlements/pending-outgoing`  
- POST `/settlements/:id/accept`  
- POST `/settlements/:id/reject`  
- GET `/settlements/completed`  

### **Activity Feed (Protected)**
- GET `/groups/:groupId/feed`  

---

## 📌 7. Settlement Workflow (Critical Logic)

### **1. User initiates settlement**
- Does **NOT** modify balance  
- Creates a *pending* settlement request  

### **2. Other user accepts**
- Ledger updates:  
fromUser → toUser: amount -= paidAmount

- If amount becomes **0**, entry is removed  
- Activity feed logs the event  

### **3. Reject**
- No balance change  
- Feed logs the rejection  

📌 *Balances are only modified on acceptance.*

---

## 📌 8. Expense Workflow
1. Add expense (equal/custom)  
2. Compute shares  
3. Update balances:
Every user owes the payer their share.

4. Log event in activity feed  

---

## 📌 9. System Architecture (Monolithic Modular)

### **Modules**
- auth  
- users  
- groups  
- expenses  
- balances  
- settlements  
- activities  

### **Backend**
- Node.js + Express  
- MongoDB + Mongoose  
- JWT authentication  

### **Frontend**
- React  
- Context API or Redux  
- Tailwind or CSS  
- REST API integration  

### **Deployment**
- Docker containers  
- AWS (ECS/EC2)  

---

## 📌 10. Next Steps (Development Roadmap)

### **Step 7 (Upcoming): Backend Implementation**
- Node project setup  
- Express server  
- Mongo connection  
- JWT middleware  
- Auth module  
- Group module  
- Expense module  
- Balance calculation logic  
- Settlement workflow  
- Activity feed integration  

---

### **After Backend**
- **Step 8:** Frontend screens  
- **Step 9:** API integration  
- **Step 10:** Testing  
- **Step 11:** Deployment  

---


