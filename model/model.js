import data from "../db/db.json" with {type : "json"} ;

class TodoModel{
    constructor(file = data){
        this.file = file;
    }

    getAllTodo(){
        const allTodo = this.file.todo 
        if (!allTodo) return { message: null }
        return allTodo
    }
}

const todoModel = new TodoModel()

export default todoModel;
