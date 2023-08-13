import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);

  // Async function to fetch data from Airtable API
  const fetchData = async () => {
    try {
      // Options for the fetch request
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      };

      // Construct the API URL
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

      // Fetch data from API
      const response = await fetch(url, options);

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Parse the response data
      const data = await response.json();

      // Transform data.records into an array of todos
      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
      }));

      // Set the todo list and indicate loading is complete
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(`Fetch error: ${error.message}`);
      setIsLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Other functions for handling todos

  // Add a new todo to the todoList
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  // Remove a todo from the todoList
  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };


  return (
    <>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </>
  );
}

export default App;
