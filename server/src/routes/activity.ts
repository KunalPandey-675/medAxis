import express from "express";
import { requireAuth } from "../middleware/auth";
import { addActivityLog, getActivityLogs } from "../controllers/activity";
import { checkRole } from "../middleware/checkRole";


const activityLogRouter = express.Router()

activityLogRouter.get('/', requireAuth, checkRole(['admin']), getActivityLogs);
activityLogRouter.post('/create', requireAuth, addActivityLog)

export default activityLogRouter