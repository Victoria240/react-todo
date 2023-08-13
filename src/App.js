import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  // Define states for the list of todos and loading state
  const [todoList, setTodoList] = useState([]); // Initialize todoList state with an empty array
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state as true
  const [appState, setAppState] = useState ('')

  async function fetchData() {
    // Define options for the API request
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };

    // Construct the URL for the API
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

      // Update the todoList state with fetched todos
      setTodoList(todos);
      setIsLoading(false); // Set isLoading to false after data fetch

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

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
      // Update the entire state object
      setAppState({
        todoList: [...appState.todoList, { id: data.id, title: newTodo.title }],
        isLoading: false,
      });


    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  }

  // Function to remove a todo by ID
  function removeTodo(id) {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  }

  return (
    <>
      <h1>Todo List</h1>
      {/* Pass the handleAddTodo function to the AddTodoForm component */}
      <AddTodoForm onAddTodo={handleAddTodo} />
      {/* Conditional rendering based on isLoading state */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        // Pass the todoList and removeTodo function to the TodoList component
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
