import { Router } from "express";

import { requireAuth } from "../middleware/auth";
import { checkRole } from "../middleware/checkRole";
import { allBilling, createCheckoutSession, getBillingHistory, getMyActiveInvoice } from "../controllers/invoice";

const invoiceRouter = Router()

invoiceRouter.get("/my-active-invoice", requireAuth, checkRole(["admin", "patient"]), getMyActiveInvoice)
invoiceRouter.get("/", requireAuth, checkRole(["admin"]), allBilling);
invoiceRouter.get("/history/:id", requireAuth, getBillingHistory);
invoiceRouter.post("/:id/checkout", requireAuth, createCheckoutSession);
export default invoiceRouter    