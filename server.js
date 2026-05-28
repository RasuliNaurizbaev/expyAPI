// server.js
import express from "express";
import route from "./route/route.js";

const app = express();
const PORT = 3001;

// Global logger middleware to see incoming requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use("/api/v1", route);

// Error fallback middleware
app.use((err, req, res, next) => {
    console.error("SERVER CRASHED:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
