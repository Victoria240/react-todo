import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

// Define the App component
function App() {
  const [newTodo, setNewTodo] = useState(""); // State variable for new todo

  // Render the App component
  return (
    <div>
      <h1>Todo List</h1> {/* Render a level-one heading */}
      <TodoList /> {/* Render the TodoList component */}
      <AddTodoForm onAddTodo={setNewTodo} /> {/* Render the AddTodoForm component and pass onAddTodo callback */}
      <p>New Todo: {newTodo}</p> {/* Display the new todo value */}
    </div>
  );
}

export default App;



