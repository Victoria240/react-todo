import React from 'react';

function App() {
  // Define an array of todo items
  const todoList = [
    { id: 1, title: 'Complete assignment' },  // First todo item
    { id: 2, title: 'Buy groceries' },        // Second todo item
    { id: 3, title: 'Go for a run' },         // Third todo item
  ];

  // Render the component
  return (
    <div>
      <h1>Todo List</h1>  {/* Render a level-one heading */}
      <ul>
        {/* Map over the todoList array and render a list item for each todo */}
        {todoList.map(todo => (
          <li key={todo.id}>{todo.title}</li>  /* Use the id as the key and display the title */ 
        ))}
      </ul>
    </div>
  );
}

export default App;


