import React from 'react'

// Define the TodoListItem component
function TodoListItem(todo) { // Destructure props
    return (
        <li> {todo.title}</li> // Render the todo item title with the unique id as the key
    );
}

export default TodoListItem;