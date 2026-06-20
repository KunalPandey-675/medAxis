import type { Request, Response } from "express";
import invoice from "../models/invoice";

import { fromNodeHeaders } from "better-auth/node";
import mongoose from "mongoose";

export const getMyActiveInvoice = async (req: Request, res: Response) => {
    try {
        const currentUserId = (req as any).user.id;


        const activeInvoice = await invoice.findOne({
            patientId: currentUserId,
            status: { $in: ["draft", "pending_payment"] },
        })

        if (!activeInvoice) {
            return res.status(404).json({ message: " No active invoice found" });
        }

        res.status(202).json(activeInvoice)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export const getBillingHistory = async (req: Request, res: Response) => {
    try {
        const currentUserId = (req as any).user.id;


        const activeInvoice = await invoice.findOne({
            patientId: currentUserId,
            status: { $in: ["paid"] },
        })

        if (!activeInvoice) {
            return res.status(404).json({ message: " No active invoice found" });
        }

        res.status(202).json(activeInvoice)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const allBilling = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const billings = await invoice
            .find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const count = await invoice.countDocuments();
        const collection = mongoose.connection.collection("user");
        const users = await collection
            .find(
                { role: "patient" },
                { projection: { password: 0, headers: 0, emailVerified: 0 } },
            )
            .toArray();

        // 4. Create a Lookup Map for instant access
        const userMap = new Map<string, any>();
        users.forEach((user) => {
            userMap.set(user._id.toString(), user);
        });

        const billingsWithUser = billings.map((billing) => {
            const user = userMap.get(billing.patientId.toString());
            return {
                ...billing,
                user: user || null, // If no user found, set user to null
            };
        });

        res.json({
            res: billingsWithUser,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                totalData: count,
                limit,
            },
        });
    } catch (error) {
        console.error("Error fetching billing history:", error);
        res.status(500).json({ message: "Failed to fetch billing history" });
    }
};