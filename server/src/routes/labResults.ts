import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { checkRole } from "../middleware/checkRole";
import {
    createLabResults,
    getPatientLabResults,
    updateLabResult,
} from "../controllers/labResults";

const labResultsRouter = Router();

labResultsRouter.post(
    "/",
    requireAuth,
    checkRole(["admin", "doctor", "nurse", "lab_tech"]),
    createLabResults,
);
labResultsRouter.get(
    "/patient/:patientId",
    requireAuth,
    checkRole(["admin", "doctor", "nurse", "lab_tech"]),
    getPatientLabResults,
);

labResultsRouter.put(
    "/:id",
    requireAuth,
    checkRole(["admin", "doctor", "nurse", "lab_tech"]),
    updateLabResult,
);



export default labResultsRouter;