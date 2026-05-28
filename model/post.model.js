import data from "../db/db.json" with { type: "json" };
import path from "path";
import fs from "fs";

class PostModel {
    constructor(file = data) {
        this.file = file;
    }

    // Fixed month (0-12) and day (.getDate instead of .getDay)
    timeHelper() {
        const date = new Date();
        const year = date.getFullYear();
        const day = date.getDate(); 
        const month = date.getMonth() + 1; 
        const hour = date.getHours();
        const min = date.getMinutes().toString().padStart(2, '0'); // Keeps minutes looking like :05 instead of :5
        return `${year}/${month}/${day} ${hour}:${min}`;
    }

    // Fixed: Grabs the ID of the very last item in the array
    generateId() {
        const posts = this.file.post;
        if (!posts || posts.length === 0) {
            return 1;
        }
        const lastPost = posts[posts.length - 1];
        return lastPost.id + 1;
    }

    // Helper to save data to the file automatically
    saveToDatabase() {
        fs.writeFileSync(
            path.resolve(import.meta.dirname, "../db/db.json"),
            JSON.stringify(this.file, null, 2)
        );
    }

    getAllPost() {
        try { 
            const allPost = this.file.post;
            if (allPost.length === 0) {
                return { message: "File is empty!" };
            }
            return allPost;
        } catch (e) {
            console.log("Error", e);
        }
    }

    getPostByID(id) {
        try {
            // id from req.params is usually a string, convert to number to match our generated numeric IDs
            const numericId = Number(id); 
            for (const item of this.file.post) {
                if (item.id === numericId) {
                    return item;
                }
            }
            return { message: "Item not found" };
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    createPost(newTitle, newDescription) {
        try {
            if (!newTitle || newTitle == "") {
                return { message: "Enter one please" };
            }

            const newContent = {
                "id": this.generateId(),
                "title": newTitle,
                "description": newDescription || "",
                "createdAt": this.timeHelper()
            };
            
            this.file.post.push(newContent);
            this.saveToDatabase();
            
            return newContent;
        } catch (e) {
            console.log(`Error Model: ${e}`);
        }
    }

    // Fixed: Now accepts an ID, finds the item, updates it, and saves it
    updatePost(id, newTitle, newDescription) {
        try {
            if(!newTitle || newTitle == ""){
                return {message : "Title cant be null"}
            }

            for(const item of this.file.post){
                if(item.id == id){
                    item.title = newTitle;
                    item.description = newDescription;
                    item.updatedAt = this.timeHelper();
                    this.saveToDatabase();
                    return item;
                }
            }
            return {message : "Item not found"}
        } catch (e) {
            console.log(e);
        }
    }

    // Fixed: Finds the index of the item and cuts it out of the array
    deletePost(id) {
        try {
            if (!id) {
                return { message: "Id is missing" };
            }

            const numericId = Number(id);
            const index = this.file.post.findIndex(t => t.id === numericId);

            if (index === -1) {
                return { message: "Item not found" };
            }

            this.file.post.splice(index, 1);
            this.saveToDatabase(); // Save changes!

            return { message: `Post with id ${id} successfully deleted` };
        } catch (e) {
            console.log(e);
        }
    }
}

const postModel = new PostModel();
export default postModel;