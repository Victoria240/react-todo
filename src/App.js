import React, { useEffect, useState } from 'react';
import style from './App.module.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import NavLayout from './NavLayout'; // Import the Layout component


function App() {
  // State to hold the list of todos and loading status
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // New async function to fetch data from the API
  async function fetchData() {
    // Define options for the API request
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };

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
        console.log('Airtable error response:')
        console.log(response)
        throw new Error(`Error: ${response.status}`);
      }


      // Parse the response JSON
      const data = await response.json();


      
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


  // Fetch data on initial render
  useEffect(() => {
    fetchData();
  }, []);

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
      const confirmedTodo = data.records[0];

      // Update the todoList state by adding the new todo
      setTodoList([...todoList, { id: confirmedTodo.id, title: confirmedTodo.fields.title }]);
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  }


  // Define the removeTodo function to remove a todo item
  function removeTodo(id) {
    // Filter the todoList array to exclude the todo item with the specified id
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);


    // Update the todoList state with the new array of todos
    setTodoList(updatedTodoList);
  }


  return (

    <BrowserRouter className={style.App}>
      <NavLayout> {/* Use the Layout component */}
        <Routes>
          {/* Define a Route for the root path ("/") */}
          <Route
            path="/"
            element={


              isLoading ? <p>Loading...</p> :
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              /*Render either loading indicator or the TodoList component*/


            }
          />
          {/* Define a Route for the "/new" path */}
          <Route
            path="/new"
            element={
              <div className={style.NewTodoContainer}>
                <div className={style.NewTodo}>
                  {<h1 className={style.ListHeader}> New Todo List</h1>}
                  {<AddTodoForm onAddTodo={handleAddTodo} />} {/*Render the AddTodoForm component with the handleAddTodo function*/}

                </div>
              </div>
            }
          />
        </Routes>
      </NavLayout>
    </BrowserRouter>

  );
}


export default App;
