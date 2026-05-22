// ./route/route.js
import express from "express";

const route = express.Router();

route.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello Wolrd!" });
});

route.post("/", (req, res) => {
    return res.status(200).json({ message: "POST" });
});

route.put("/:id", (req, res) => {
    return res.status(200).json({ message: "PUT" });
});

route.delete("/:id", (req, res) => {
    return res.status(200).json({ message: "DELETE" });
});

export default route;
