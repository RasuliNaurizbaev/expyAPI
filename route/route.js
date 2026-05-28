// ./route/route.js
import express from "express";
import user from "./user.route.js"
import post from "./post.route.js"

const route = express.Router();

route.use("/user", user);
route.use("/post", post);

export default route;
