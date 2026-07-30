import { Router } from "express";
import { SoftwareController } from "../controllers/software.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);
router.use(authorize("admin", "manager"));

router.get("/", SoftwareController.getAll);
router.get("/:id", SoftwareController.getById);
router.post("/", SoftwareController.create);
router.put("/:id", SoftwareController.update);
router.delete("/:id", SoftwareController.delete);

export default router;
