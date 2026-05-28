// /model/user.model.js
import fs from "fs";
import file from "../db/db.json" with {type: "json"};
import path from "path";
import console from "console";

class UserModel{
    constructor(data = file){
        this.file = file
    }

    emailValidate(email){
        return this.file.users.some(user => user.email === email)
    }

    timeHelper() {
        const date = new Date();
        const year = date.getFullYear();
        const day = date.getDate(); 
        const month = date.getMonth() + 1; 
        const hour = date.getHours();
        const min = date.getMinutes().toString().padStart(2, '0');
        return `${year}/${month}/${day} ${hour}:${min}`;
    }

    generateID() {
        const users = this.file.users;
        if (!users || users.length === 0) {
            return 1;
        }
        const lastUser = users[users.length - 1];
        return lastUser.id + 1;
    }

    saveToDatabase() {
        fs.writeFileSync(
            path.resolve(import.meta.dirname, "../db/db.json"),
            JSON.stringify(this.file, null, 2)
        );
    }

    getAllUser(){
        try{
            if(this.file.users.length === 0){
            return { message: "Users not found" }
        }

        return this.users;
        }catch(e){
            console.log(e);
        }
    }

    getUserByID(id){
        try{
            for (const user of this.users){
                if(user.id == id){
                    return user
                }
            }
            return { message: "User not found" }
        }catch(e){
            console.log(e);
        }
    }

    createUser(username, email, password){
        try{
            if(this.emailValidate(email)){
                return { message: "Error: Email already exists..."} 
            }
            const newUser = {
                "id": this.generateID(),
                "username": username,
                "email": email,
                "password": password,
                "created_at": this.timeHelper(),
                "success": true
            }
            this.file.users.push(newUser);
            this.saveToDatabase()
            return {message: "User success created", user: newUser};
        }catch(e){
            console.log(e);
        }
    }

    updateUser(id, username, email, password){
        try{
            if(this.emailValidate(email)){
                return { message: "Error: Email already exists..." }
            }

            for(const user of this.file.users){
                if (user.id == id){
                    user.username = username;
                    user.email = email;
                    user.password = password;
                    this.saveToDatabase()
                    return user;
                }
            }
            return {message: "User not found"}
        }catch(e){
            console.log(`User model Error: ${e}`);
        }
    }

    deleteUser(id){
        try{
            if(!id){
                return {message : "Id not found"}
            }
            const index = this.file.users.findIndex(item => item.id == id);

            this.file.users.slice(index, 1);
            this.saveToDatabase();
            return {message: "User success deleted"}
        }catch(e){
            console.log(`User Model Error: ${e}`);
        }
    }

}

const userModel = new UserModel();

export default userModel;
