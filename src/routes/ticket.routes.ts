import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);

router.get("/stats", TicketController.getStats);
router.get("/", TicketController.getAll);
router.get("/:id", TicketController.getById);
router.post("/", authorize("admin", "manager"), TicketController.create);
router.put("/:id", authorize("admin", "manager"), TicketController.update);
router.delete("/:id", authorize("admin", "manager"), TicketController.delete);
router.patch("/:id/assign", authorize("admin", "manager"), TicketController.assignTechnician);
router.post("/:id/comments", TicketController.addComment);

export default router;
