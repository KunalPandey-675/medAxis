import dotenv from "dotenv"
import express, {
    type Application,
    type Request,
    type Response,
} from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { connectDB } from "./config/db";
import userRouter from "./routes/user";
import activityLogRouter from "./routes/activity";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client";
import { addChargeToInvoice, admitPatient, analyzeXRayJob } from "./inngest/functions";
import notificationRouter from "./routes/notification";
import labResultsRouter from "./routes/labResults";
import invoiceRouter from "./routes/invoice";
import { createServer } from "http";
import { getIO, initSocket } from "./lib/socket";
import { uploadRouter } from "./lib/uploadthing";
import { createRouteHandler } from "uploadthing/express";
import uploadthingRouter from "./routes/uploadthing";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

initSocket(httpServer);

app.set("io", getIO());

// cors setup
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}))
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
}))
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// test route
app.get('/', (req: Request, res: Response) => {
    res.send("Hello from the backend")
})



// mounting betterauth handler
app.all("/api/auth/*splat", toNodeHandler(auth));

// fetching user session
app.get("/api/me", async (req, res) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    return res.json(session);
});

// all user routes
app.use("/api/users", userRouter)

// activity log routes
app.use('/api/activity-logs', activityLogRouter)

//notfication routes
app.use('/api/notifications', notificationRouter)

//lab results routes
app.use('/api/lab-results', labResultsRouter)

// invoice route
app.use('/api/invoices', invoiceRouter)


// inngest route

app.use("/api/inngest", serve({
    client: inngest,
    functions: [admitPatient, analyzeXRayJob, addChargeToInvoice],
}))


// upload routes
app.use("/api/uploadthing", createRouteHandler({ router: uploadRouter }));

app.use("/api/uploadthing/delete", uploadthingRouter);

// database connection 
connectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log(
            `🚀 Server + Socket.IO running in ${process.env.NODE_ENV} mode on port ${PORT}`,
        );
    });
})
    .catch((error) => {
        console.error(
            `Failed to connect to the database: ${(error as Error).message}`,
        );
    });