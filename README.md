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

