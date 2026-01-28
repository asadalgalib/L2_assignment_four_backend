import express from 'express';
import cors from 'cors';
import { auth } from './lib/auth';
import { toNodeHandler } from "better-auth/node";

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// * auth
app.all("/api/auth/*splat", toNodeHandler(auth));
// * Default route
app.get("/", (req, res) => {
    res.send("app is running")
})
// * Export app
export default app;