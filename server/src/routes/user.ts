import express from "express";
import { requireAuth } from "../middleware/auth";
import { fetchAllUsers, getUsersById, updateUser } from "../controllers/user";
import { checkRole } from "../middleware/checkRole";

const userRouter = express.Router()

userRouter.get("/:id", requireAuth, getUsersById)

userRouter.put("/update/:id", requireAuth, checkRole(['admin', "doctor", "nurse"]), updateUser)

userRouter.get("/", requireAuth, checkRole(['admin', "doctor", "nurse"]), fetchAllUsers)


export default userRouter