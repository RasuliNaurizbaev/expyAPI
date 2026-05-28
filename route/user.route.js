// /route/user.route.js

import express from "express";
import userController from "../controller/user.controller.js";


const userAPI = express.Router();

userAPI.get("/", (req, res) => {
    return res.json(userController.getAllUser());
});

userAPI.get("/:id", (req, res) => {
    const id = req.params;

    const result = userController.getUserByID(id);
})

userAPI.post("/", (req, res) => {
    const {username, email, password} = req.body;
    
    const result = userController.createUser(username, email, password);
    res.json(result)
})

userAPI.put("/:id", (req, res) => {
    const id = req.params;
    const {username, email, password} = req.body;

    const result = userController.updateUserByID(id, username, email, password);
    res.json(result);
})

userAPI.delete("/:id", (req, res) => {
    const id = req.params;
    const result = userController.deleteUserByID(id);
})

export default userAPI;
