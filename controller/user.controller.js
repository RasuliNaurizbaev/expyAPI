// user.controller.js

import userModel from "../model/user.model.js";

class UserController{
    constructor(id, username, email, password){
        this.id = id,
        this.username = username,
        this.email = email,
        this.password = password
    }

    getAllUser(){
        try{
            return userModel.getAllUser();
        }catch(e){
            console.log(`Error User Controller: ${e}`);
        }
    }
    
    getUserByID(id){
        try{
            return userModel.getUserByID(id);
        }catch(e){
            console.log(`Error Controller User: ${e}`);
        }
    }

    createUser(username, email, password){
        try{
            return userModel.createUser(username, email, password)
        }catch(e){
            console.log(e);
        }
    }

    updateUserByID(id, username, email, password){
        try{
            return userModel.updateUser(id, username, email, password);
        }catch(e){
            console.log(`Error Controller User: ${e}`);
        }
    }

    deleteUserByID(id){
        try{
            return userModel.deleteUser(id);
        }catch(e){
            console.log(`Error User Controller: ${e}`);
        }
    }

}

const userController = new UserController();

export default userController;
