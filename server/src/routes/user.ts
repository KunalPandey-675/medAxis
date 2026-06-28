import express from "express";
import { requireAuth } from "../middleware/auth";
import { admitPatient, fetchAllUsers, getPolarPortalLink, getUsersById, updateUser } from "../controllers/user";
import { checkRole } from "../middleware/checkRole";

const userRouter = express.Router()



userRouter.get("/", requireAuth, checkRole(['admin', "doctor", "nurse"]), fetchAllUsers)

userRouter.put("/update/:id", requireAuth, checkRole(['admin', "doctor", "nurse"]), updateUser)

userRouter.get("/profile/:id", requireAuth, getUsersById)

userRouter.post("/:id/admit", requireAuth, checkRole(['admin', "doctor", "nurse"]), admitPatient)

userRouter.get("/polar-portal/:userId", requireAuth, getPolarPortalLink)

export default userRouter