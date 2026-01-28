import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));

// * Default route
app.get("/", (req, res) => {
    res.send("app is running")
})
// * Export app
export default app;