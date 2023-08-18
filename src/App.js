// App.js
import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // New async function to fetch data from the API
  async function fetchData() {
    // Declare options for the API request
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };

    // Construct the URL for the API
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    // Try-catch block for the API request
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Parse the response JSON
      const data = await response.json();

      // Print the fetched data to observe Airtable's API response
      console.log('Fetched data:', data);

      // Transform API data.records into todo objects
      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
      }));
       // Update todoList and isLoading states
      setTodoList(todos);
      setIsLoading(false);
    }
    catch (error) {
      console.log(`Fetch error: ${error.message}`);
    }
  }






  // Use useEffect to simulate loading state and fetch data from localStorage
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


// Use useEffect to manage localStorage and persist todoList
useEffect(() => {
  if (!isLoading) {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList)); //save the todoList as a string in the localStorage whenever it changes 
  }
}, [todoList, isLoading]); // execute/call the callback function(effect) only when the 'todoList' state variable changes by specifying 'todoList' as the dependency array



 // Define the removeTodo function to remove a todo item
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