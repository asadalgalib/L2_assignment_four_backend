import express from 'express';
import cors from 'cors';
import { auth } from './lib/auth';
import { toNodeHandler } from "better-auth/node";
import { publicRoutes } from './modules/publicRoute/public.route';
import { tutorRoutes } from './modules/tutorRoute/tutor.route';
import { bookingRoutes } from './modules/bookingRoute/booking.route';
import { userRoutes } from './modules/userRoute/user.route';
import { reviewRoutes } from './modules/reviewRoute/review.route';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// * Auth Routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// * User Route
app.use("/user", userRoutes)

// * Public routes
app.use("/public", publicRoutes);

// * Booking routes
app.use("/booking", bookingRoutes)

// * Tutor routes
app.use("/tutor", tutorRoutes);

// * Review routes
app.use("/review", reviewRoutes)

// * Default route
app.get("/", (req, res) => {
    res.send("app is running")
})

// * Export app
export default app;