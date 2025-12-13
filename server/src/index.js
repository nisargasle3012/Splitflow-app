import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./modules/users/user.routes.js";
import groupRoutes from "./modules/groups/group.routes.js";
import expenseRoutes from "./modules/expenses/expense.routes.js";
import balanceRoutes from "./modules/balances/balance.routes.js";
import settlementRoutes from "./modules/settlements/settlement.routes.js";
import activityRoutes from "./modules/activity/activity.routes.js";
import globalBalanceRoutes from "./modules/balances/globalBalance.routes.js";
import globalSettlementRoutes from "./modules/settlements/globalSettlement.routes.js";
import globalSettlementFetchRoutes from "./modules/settlements/globalSettlement.fetch.routes.js";
import globalSettlementActionRoutes from "./modules/settlements/globalSettlement.action.routes.js";
import globalActivityRoutes from "./modules/activity/globalActivity.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Health check
app.get("/", (req, res) => res.send("API is running"));

//ROUTES
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/balances", balanceRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/settlements", settlementRoutes);
app.use("/api/globalBalances", globalBalanceRoutes);
app.use("/api/globalSettlements", globalSettlementRoutes);
app.use("/api/globalSettlementsFetch", globalSettlementFetchRoutes);
app.use("/api/globalSettlementsAction", globalSettlementActionRoutes);
app.use("/api/globalActivity", globalActivityRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
