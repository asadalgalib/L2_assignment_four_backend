import express from 'express';
import cors from 'cors';
import { auth } from './lib/auth';
import { toNodeHandler } from "better-auth/node";
import { publicRoutes } from './modules/publicRoute/public.route';
import { tutorRoutes } from './modules/tutorRoute/tutor.route';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// * Auth Routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// * Public routes
app.use("/tutors", publicRoutes);

// * Tutor routes
app.use("/tutor", tutorRoutes);

// * Default route
app.get("/", (req, res) => {
    res.send("app is running")
})
// * Export app
export default app;