import express from "express";
import authenticate from "../middlewares/authenticate";
import adminRoute from "../middlewares/adminRoute";
import {
  login,
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users";

const router = express.Router();

router.post("/login", login);

router.get("/:id", [authenticate, adminRoute], getUser);

router.get("/", [authenticate, adminRoute], getUsers);

router.post("/", [authenticate, adminRoute], createUser);

router.put("/:id", [authenticate, adminRoute], updateUser);

router.delete("/:id", [authenticate, adminRoute], deleteUser);

export default router;
