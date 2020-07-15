import express from "express";
import authenticate from "../middlewares/authenticate";
import adminRoute from "../middlewares/adminRoute";
import {
  getProcessingLevels,
  getProcessingLevel,
  createProcessingLevel,
  updateProcessingLevel,
  deleteProcessingLevel,
} from "../controllers/ProcessingLevels";

const router = express.Router();

router.get("/", [authenticate, adminRoute], getProcessingLevels);

router.get("/:id", [authenticate, adminRoute], getProcessingLevel);

router.post("/", [authenticate, adminRoute], createProcessingLevel);

router.put("/:id", [authenticate, adminRoute], updateProcessingLevel);

router.delete("/:id", [authenticate, adminRoute], deleteProcessingLevel);

export default router;
