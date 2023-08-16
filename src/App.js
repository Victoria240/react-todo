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
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
      }));

      setAppState({
        ...appState,
        todoList: todos,
        isLoading: false,
      });

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }); // No need to add fetchData to dependency array

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

      setAppState({
        ...appState,
        todoList: [...appState.todoList, { id: data.id, title: newTodo.title }],
      });

    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  }

  function removeTodo(id) {
    const updatedTodoList = appState.todoList.filter((todo) => todo.id !== id);
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
            /* Render the TodoList component with props */
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
            /* Render the AddTodoForm component with props */
            <AddTodoForm onAddTodo={handleAddTodo} /> // Pass the handleAddTodo function as a prop
          }
        />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
