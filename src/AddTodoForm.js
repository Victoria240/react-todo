// AddTodoForm.js
import React, { useState } from 'react';

function AddTodoForm({ onAddTodo }) { // Destructure props
  const [todoTitle, setTodoTitle] = useState(''); // Create new state variable todoTitle

  // Handle form submission
  function handleAddTodoFormSubmit(e) {
    e.preventDefault();
    const newTodo = {
      title: todoTitle,
      id: Date.now(), // Generate unique identifier
    };
    onAddTodo(newTodo); // Pass the newTodo object to the onAddTodo callback prop
    setTodoTitle(''); // Reset todoTitle state to an empty string
  }

  // Handle input change
  function handleTitleChange(e) {
    const newTodoTitle = e.target.value;
    setTodoTitle(newTodoTitle); // Update todoTitle state
  }

  return (
    <div>
      <form onSubmit={handleAddTodoFormSubmit}>
        <label htmlFor='todoTitle'>Title</label>
        <input
          id='todoTitle'
          name='title'
          value={todoTitle} // Use todoTitle state as the value
          onChange={handleTitleChange} // Handle input change
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
