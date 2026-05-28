import postModel from "../model/post.model.js"

class PostController{
    constructor(newTitle, newDescription){
        this.newTitle = newTitle;
        this.newDescription = newDescription;
    }

    getAllPost(){
        try{
            return postModel.getAllPost()
        }catch(e){
            console.log(e)
        }
    }

    getPostByID(id){
        try{
            return postModel.getPostByID(id)
        }catch(e){
            console.log(`Error: ${e}`);
        }
    }
    
    createPost(newTitle, newDescription){
        try{
            return postModel.createPost(newTitle, newDescription);
        }catch(e){
            console.log(`Error Controller: ${e}`);
        }
    }

    putPost(id, newTitle, newDescription){
        try{
            return postModel.updatePost(id, newTitle, newDescription);
        }catch(e){
            console.log(`Error: ${e}`);
        }
    }

    deletePost(id){
        try{
            return postModel.deletePost(id)
        }catch(e){
            console.log(e)
        }
    }

}

const postController = new PostController();

export default postController;
