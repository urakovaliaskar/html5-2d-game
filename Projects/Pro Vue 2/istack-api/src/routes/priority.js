import express from "express";
import authenticate from "../middlewares/authenticate";
import adminRoute from "../middlewares/adminRoute";
import {
  getPriorities,
  getPriority,
  createPriority,
  updatePriority,
  deletePriority,
} from "../controllers/Priorities";

const router = express.Router();

router.get("/", [authenticate, adminRoute], getPriorities);

router.get("/:id", [authenticate, adminRoute], getPriority);

router.post("/", [authenticate, adminRoute], createPriority);

router.put("/:id", [authenticate, adminRoute], updatePriority);

router.delete("/:id", [authenticate, adminRoute], deletePriority);

export default router;
