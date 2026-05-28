// ./route/post.route.js
import express from "express";
import postController from "../controller/post.controller.js";

const postAPI = express.Router();

postAPI.get("/", (req, res) => {
    try{
        const result = postController.getAllPost()
        return res.json(result)
    }catch(e){
        console.log(`Error -> Route Layer: ${e}`)
    }
});

postAPI.get("/:id", (req, res) => {
    try{
        const id = req.params.id
        const result = PostController.getPostByID(id)
        return res.json(result)
    }catch(e){
        console.log(e)
    }
})

postAPI.post("/", (req, res) => {
    try{
        // request keys on postman need some names in route here!
        const {title, description} = req.body;
        const result = postController.createPost(title, description);
        return res.json(result)
    }catch(e){
        console.log(e);
    }

});

postAPI.put("/:id", (req, res) => {
    try{
        const id = req.params.id;
        const {title, description} = req.body;
        const result = postController.putPost(id, title, description)
        return res.json(result)
    }catch(e){
        console.log(e);
    }
});

postAPI.delete("/:id", (req, res) => {
    try{
        const id = req.params.id;
        const result = postController.deletePost(id);
        return res.json(result)
    }catch(e){
        console.log(e);
    }
});

export default postAPI;
