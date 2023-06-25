// App.js
import React, { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]); // Create new state variable todoList

  // Handle adding a new todo
  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]); // Update todoList state by adding the new todo
  }

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} /> {/* Update onAddTodo prop */}
      <TodoList todoList={todoList} /> {/* Pass todoList state as a prop */}
    </div>
  );
}

export default App;
