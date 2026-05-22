// server.js

import express from "express";
import route from "./route/route.js"

const app = express();

const PORT = 3001;

app.use(express.json());

app.use("/api/v1", route);

app.listen(PORT, () => console.log(`Server running in ${PORT}`));
