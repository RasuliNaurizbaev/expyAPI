// ./route/route.js
import express from "express";
import todoController from "../controller/controller.js";

const route = express.Router();

route.get("/", (req, res) => todoController.getAllTodo());

route.post("/", (req, res) => todoController);

route.put("/:id", (req, res) => {
    return res.status(200).json({ message: "PUT" });
});

route.delete("/:id", (req, res) => {
    return res.status(200).json({ message: "DELETE" });
});

export default route;
