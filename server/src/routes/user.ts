import express from "express";
import { requireAuth } from "../middleware/auth";
import { admitPatient, fetchAllUsers, getUsersById, updateUser } from "../controllers/user";
import { checkRole } from "../middleware/checkRole";

const userRouter = express.Router()



userRouter.get("/", requireAuth, checkRole(['admin', "doctor", "nurse"]), fetchAllUsers)

userRouter.put("/update/:id", requireAuth, checkRole(['admin', "doctor", "nurse"]), updateUser)

userRouter.get("/:id", requireAuth, getUsersById)

userRouter.post("/:id/admit", requireAuth, checkRole(['admin', "doctor", "nurse"]), admitPatient)
export default userRouter