import todoModel from "../model/model.js"

class TodoController{
    constructor(newTitle, newDescription){
        this.newTitle = newTitle;
        this.newDescription = newDescription;
    }

    getAllTodo(){
        todoModel.getAllTodo()
    }

    getByID(id){

    }
    
    create(){

    }

    putTodo(id){

    }

    deleteTodo(id){

    }

}

const todoController = new TodoController();

export default todoController;
