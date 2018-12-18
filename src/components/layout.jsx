
import React from 'react';
import todoStore from '../stores/todos.store';

import todoActions from '../actions/todo.actions';
import './layout.css'

export default class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: todoStore.getAllTodos(),
            addValue:""
        }
    }


    componentDidMount() {
        todoStore.on('change',()=>{
            this.setState({todos:todoStore.getAllTodos()});
        })
    }

    handleChange(e) {
        this.setState({addValue:e.target.value});
    }

    addTodo(){
        todoActions.addTodo(this.state.addValue);
    }

    deleteTodo(deleteId){
        todoActions.deleteTodo(deleteId)
    }

    render() {
        const elem = this.state.todos.map((todo) => <li key={todo.id}><b>Id: </b>{todo.id} <b>Name: </b> {todo.name}  <span onClick={this.deleteTodo.bind(this, todo.id)}> X </span></li>)
        return (
            <div>
                <h3>List of Todos</h3>
                <ul>
                    {elem}
                </ul>

                <div className="input">
                    <input type="text" placeholder="Enter New Todo" onChange={this.handleChange.bind(this)}/>
                    <button type="button"  onClick={this.addTodo.bind(this)}> Add Todo </button>
                </div>

            </div>
        )
    }
}