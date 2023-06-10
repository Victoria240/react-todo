import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  
  // Render the component
  return (
    <div>
      <h1>Todo List</h1>  {/* Render a level-one heading */}
      <TodoList />
      <AddTodoForm/>
    </div>
    
  );
}

export default App;


