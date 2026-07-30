import { Router } from "express";
import { ContractController } from "../controllers/contract.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);
router.use(authorize("admin", "manager"));

router.get("/", ContractController.getAll);
router.get("/:id", ContractController.getById);
router.post("/", ContractController.create);
router.put("/:id", ContractController.update);
router.delete("/:id", ContractController.delete);

export default router;
