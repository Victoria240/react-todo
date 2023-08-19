import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // New async function to fetch data from the API
  async function fetchData() {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };


    // Construct the URL for the API
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;


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
    } catch (error) {
      console.log(`Fetch error: ${error.message}`);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);


  // Use useEffect to manage localStorage and persist todoList
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList)); // Save the todoList in localStorage when it changes
    }
  }, [todoList, isLoading]);


  // Handle adding a new todo
  async function handleAddTodo(newTodo) {
    try {
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;


      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [{ fields: { title: newTodo.title } }],
        }),
      });


      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }


      const data = await response.json();


      // Update the todoList state by adding the new todo
      setTodoList([...todoList, { id: data.id, title: newTodo.title }]);
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  }


  // Use useEffect to simulate loading state and fetch data from localStorage with a 2 seconds delay
  useEffect(() => {
    setTimeout(() => {
      const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList")) || [];
      setTodoList(savedTodoList);
      setIsLoading(false);
    }, 2000);
  }, []); // Empty dependency array, so this effect runs once after initial render




  // Define the removeTodo function to remove a todo item
  function removeTodo(id) {
    // Filter the todoList array to exclude the todo item with the specified id
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);


    // Update the todoList state with the new array of todos
    setTodoList(updatedTodoList);
  }


 return (
  <BrowserRouter>
    <Routes>
      {/* Define a Route for the root path ("/") */}
      <Route
        path="/"
        element={
          <AddTodoForm onAddTodo={handleAddTodo} /> // Render the AddTodoForm component with the handleAddTodo function
        }
      />
      {/* Define a Route for the "/new" path */}
      <Route
        path="/new"
        element={
          isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} /> // Render either loading indicator or the TodoList component
        }
      />
    </Routes>
  </BrowserRouter>
);
}


export default App;
