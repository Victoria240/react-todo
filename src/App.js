// App.js
import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function useSemiPersistentState() {  //custom hook to store and retrieve the todoList in the localStorage
  const [todoList, setTodoList] = useState( //  use the useState hook to create a state variable todoList and its corresponding setter function setTodoList
    JSON.parse(localStorage.getItem("savedTodoList")) || [] // initialize the todoList state variable with the value obtained from the "savedTodoList" (key) item in the localStorage.  If there is no item or the value is null(unable to parse), set it to an empty array [].   
  );

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList)); //save the todoList as a string in the localStorage whenever it changes 
  }, [todoList]); // execute/call the callback function(effect) only when the 'todoList' state variable changes by specifying 'todoList' as the dependency array

  return [todoList, setTodoList]; //allows components that use the useSemiPersistentState hook to access and modify the todoList state with automatic synchronization to the localStorage
}


function App() {
   

  const [todoList, setTodoList] = useSemiPersistentState(); // use custom hook

  // Handle adding a new todo
  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]); // Update todoList state by adding the new todo
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} /> {/* Update onAddTodo prop */}
      <TodoList todoList={todoList} /> {/* Pass todoList state as a prop */}
     
    </>
  );
}

export default App;
