import React from 'react'

// Define the AddTodoForm component
function AddTodoForm(props) {
    // Handle form submission
    function handleAddTodo(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        const todoTitle = e.target.elements.todoTitle.value; // Get the value of the todo title input
        console.log(todoTitle); // Log the todo title value
        e.target.reset(); // Reset the form so the text input is cleared
        props.onAddTodo(todoTitle); // Invoke the onAddTodo callback prop with the todo title value
    }
          // Render the form for adding a todo
        return (
            <div>
                <form onSubmit={handleAddTodo}>
                    <label htmlFor='todoTitle'>Title</label>
                    <input id='todoTitle' name="title"/> {/* Add name attribute */}
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
    export default AddTodoForm


