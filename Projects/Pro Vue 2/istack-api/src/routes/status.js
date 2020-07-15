import express from "express";
import authenticate from "../middlewares/authenticate";
import adminRoute from "../middlewares/adminRoute";

import {
  getStatuses,
  getStatus,
  createStatus,
  updateStatus,
  deleteStatus,
} from "../controllers/Statuses";

const router = express.Router();

router.get("/", [authenticate, adminRoute], getStatuses);

router.get("/:id", [authenticate, adminRoute], getStatus);

router.post("/", [authenticate, adminRoute], createStatus);

router.put("/:id", [authenticate, adminRoute], updateStatus);

router.delete("/:id", [authenticate, adminRoute], deleteStatus);

export default router;
