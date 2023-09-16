// AddTodoForm.js
import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import styles from './AddTodoForm.module.css';

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
    <div className={styles.AddTodoFormContainer}>
      <form onSubmit={handleAddTodoFormSubmit} className={styles.Form}>
        <InputWithLabel
          value={todoTitle}
          onChange={handleTitleChange}
        />
        <button type="submit" className={styles.AddButton}>Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
