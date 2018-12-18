
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/todos.dispatcher';

export class TodoStore extends EventEmitter {

    constructor() {
        super();
        this.todos = [
            {
                name: "Wakeup",
                id: "1",
                completed: false
            },
            {
                name: "Take Bath",
                id: "2",
                completed: false
            },
            {
                name: "Wear good clothes",
                id: "3",
                completed: false
            }
        ]
    }

    getAllTodos() {
        return this.todos;
    }


    addTodo(payload) {
        const id = Date.now();
        this.todos.push({
            name: payload.name,
            id,
            completed: payload.completed
        });
        this.detectChange();
    }

    deleteTodo(payload){
        this.todos = this.todos.filter((todo)=> todo.id !== payload.id);
        this.detectChange();
    }

    detectChange() {
        todoStore.emit('change');
    }

    handleActions(payload) {
        switch (payload.type) {
            case 'CREATE_TODO': {
                this.addTodo(payload);
                break;
            }
            case 'DELETE_TODO': {
                this.deleteTodo(payload);
                break;
            }
            default: {
                break;
            }
        }
    }

}




const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions.bind(todoStore));
export default todoStore;

