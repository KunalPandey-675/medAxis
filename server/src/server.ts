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
import { admitPatient } from "./inngest/functions";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

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

// activity log router
app.use('/api/activity-logs', activityLogRouter)


// inngest route

app.use("/api/inngest", serve({
    client: inngest,
    functions: [admitPatient],
}))



// database connection 
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.error(`Failed to connect : ${(error as Error).message}`)
})