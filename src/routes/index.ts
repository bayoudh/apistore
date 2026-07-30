import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import clientRoutes from "./client.routes";
import softwareRoutes from "./software.routes";
import ticketRoutes from "./ticket.routes";
import maintenanceRoutes from "./maintenance.routes";
import contractRoutes from "./contract.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/clients", clientRoutes);
router.use("/software", softwareRoutes);
router.use("/tickets", ticketRoutes);
router.use("/maintenance", maintenanceRoutes);
router.use("/contracts", contractRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
