import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  // Define the initial app state
  const [appState, setAppState] = useState({
    todoList: [],
    isLoading: true,
  });

  async function fetchData() {
    // Define options for the API request
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      // Fetch data from the API using the constructed URL and options
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Transform API data.records into todo objects
      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
      }));

      // Update the appState with fetched todos
      setAppState({
        ...appState,
        todoList: todos,
        isLoading: false,
      });

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array, fetch data only on component mount

  async function handleAddTodo(newTodo) {
    try {
      // Construct URL for POST request to add a new todo
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

      // Update appState with the new todo
      setAppState({
        ...appState,
        todoList: [...appState.todoList, { id: data.id, title: newTodo.title }],
      });

    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  }

  function removeTodo(id) {
    // Filter out the todo with the given id
    const updatedTodoList = appState.todoList.filter((todo) => todo.id !== id);
    // Update appState with the filtered todoList
    setAppState({
      ...appState,
      todoList: updatedTodoList,
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Define a Route for the root path ("/") */}
        <Route
          path="/"
          element={
            <TodoList
              todoList={appState.todoList} // Pass the todoList state as a prop
              onRemoveTodo={removeTodo}    // Pass the removeTodo function as a prop
            />
          }
        />
        {/* Define a Route for the "/new" path */}
        <Route
          path="/new"
          element={
            <AddTodoForm onAddTodo={handleAddTodo} /> // Pass the handleAddTodo function as a prop
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
