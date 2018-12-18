

import dispatcher from '../dispatcher/todos.dispatcher';
export class TodoActions {
    addTodo(name){
        var payload = {
            type:'CREATE_TODO',
            name,
            completed:false
        }
        dispatcher.dispatch(payload);
    }

    deleteTodo(id){
        var payload = {
            type: 'DELETE_TODO',
            id
        }
        dispatcher.dispatch(payload);
    }
}

const todoActions = new TodoActions();
export default todoActions;