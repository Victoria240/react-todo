// App.js
import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [], // Set todoList property with data from localStorage
          }
        });
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
    }).then((result) => {
      setTodoList(result.data.todoList); // Update the todoList state with the fetched data
      setIsLoading(false); // Turn off loading indicator
    });
  }, []); // Empty dependency array, so this effect runs once after initial render


    useEffect(() => {
      if (!isLoading) {
        localStorage.setItem('savedTodoList', JSON.stringify(todoList)); //save the todoList as a string in the localStorage whenever it changes 
      }
    }, [todoList, isLoading]); // execute/call the callback function(effect) only when the 'todoList' state variable changes by specifying 'todoList' as the dependency array




    function removeTodo(id) {
      // Filter the todoList array to exclude the todo item with the specified id
      const updatedTodoList = todoList.filter((todo) => todo.id !== id);

      // Update the todoList state with the new array of todos
      setTodoList(updatedTodoList);
    }


    // Handle adding a new todo
    function addTodo(newTodo) {
      setTodoList([...todoList, newTodo]); // Update todoList state by adding the new todo
    }

    return (
      <>
        <AddTodoForm onAddTodo={addTodo} />
        {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
        

      </>
    );
  }

export default App;
