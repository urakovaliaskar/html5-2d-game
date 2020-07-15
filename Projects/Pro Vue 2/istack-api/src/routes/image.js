import express from "express";
import authenticate from "../middlewares/authenticate";
import adminRoute from "../middlewares/adminRoute";
import {
  getImages,
  getImage,
  createImage,
  updateImage,
  deleteImage,
} from "../controllers/Images";

const router = express.Router();

router.get("/", [authenticate], getImages);
router.get("/:id", [authenticate], getImage);
router.post("/", [authenticate, adminRoute], createImage);
router.put("/:id", [authenticate, adminRoute], updateImage);
router.delete("/:id", [authenticate, adminRoute], deleteImage);

export default router;
