// TodoContainer.js
import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";

function TodoContainer() {
  // State to hold the list of todos and loading status
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // New async function to fetch data from the API
  async function fetchData() {
    // Define options for the API request
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };

    // Construct the URL for the API
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        console.log("Airtable error response:");
        console.log(response);
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

  // Define the removeTodo function to remove a todo item
  function removeTodo(id) {
    // Filter the todoList array to exclude the todo item with the specified id
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);

    // Update the todoList state with the new array of todos
    setTodoList(updatedTodoList);
  }

  return (
    <>
      <TodoList
        todoList={todoList}
        onRemoveTodo={removeTodo}
        isLoading={isLoading}
      />
    </>
  );
}

export default TodoContainer;
