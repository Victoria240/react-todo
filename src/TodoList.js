// TodoList.js
import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onRemoveTodo }) {
    // Destructure the props todoList and onRemoveTodo from the incoming props object

    return (
        <div>
            {/* Render a heading */}
            <h2>Todo List</h2>
            <ul>
                {/* Map over the todoList array */}
                {todoList.map(todo => (
                    <TodoListItem
                        key={todo.id} // Assign a unique key to each TodoListItem
                        todo={todo} // Pass the todo object as a prop to TodoListItem
                        onRemoveTodo={onRemoveTodo} // Pass the onRemoveTodo function as a prop to TodoListItem
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;

