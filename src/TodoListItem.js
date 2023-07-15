import React from 'react';

// Define the TodoListItem component
function TodoListItem({ todo, onRemoveTodo }) {
    // Define a click event handler for the remove button
    const handleRemoveClick = () => {
        // Call the onRemoveTodo callback with the todo id as the argument
        onRemoveTodo(todo.id);
    };

    return (
        <>
            <li>{todo.title}</li> {/* Render the todo item title */}
            <button onClick={handleRemoveClick}>Remove</button> {/* Render the remove button */}
        </>
    );
}

export default TodoListItem;
