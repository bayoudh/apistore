import { Router } from "express";
import { MaintenanceController } from "../controllers/maintenance.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);
router.use(authorize("admin", "manager", "technician"));

router.get("/", MaintenanceController.getAll);
router.get("/:id", MaintenanceController.getById);
router.post("/", MaintenanceController.create);
router.put("/:id", MaintenanceController.update);
router.delete("/:id", MaintenanceController.delete);

export default router;
