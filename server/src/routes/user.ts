import express from "express";
import { requireAuth } from "../middleware/auth";
import { admitPatient, fetchAllUsers, getUsersById, updateUser } from "../controllers/user";
import { checkRole } from "../middleware/checkRole";

const userRouter = express.Router()

userRouter.get("/:id", requireAuth, getUsersById)

userRouter.put("/update/:id", requireAuth, checkRole(['admin', "doctor", "nurse"]), updateUser)

userRouter.get("/", requireAuth, checkRole(['admin', "doctor", "nurse"]), fetchAllUsers)

userRouter.post("/:id/admit", requireAuth, checkRole(['admin', "doctor", "nurse"]), admitPatient)
export default userRouter