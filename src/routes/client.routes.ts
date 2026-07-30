import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);
router.use(authorize("admin", "manager"));

router.get("/", ClientController.getAll);
router.get("/:id", ClientController.getById);
router.post("/", ClientController.create);
router.put("/:id", ClientController.update);
router.delete("/:id", ClientController.delete);

export default router;
