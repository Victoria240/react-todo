import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import style from './App.module.css';

import AddTodoForm from './Components/AddTodoForm';
import NavLayout from './Components/NavLayout';
import TodoContainer from './Components/TodoContainer';



function App() {

  // State to hold the list of todos and loading status
  const [todoList, setTodoList] = useState([]);
  
  
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

  
  return (
    <BrowserRouter className={style.App}>
      <NavLayout>
        <Routes>
          <Route path="/" element={<TodoContainer />} />
          <Route
            path="/new"
            element={
              <div className={style.NewTodoContainer}>
                <div className={style.NewTodo}>
                  <h1 className={style.ListHeader}>New Todo List</h1>
                  <AddTodoForm onAddTodo={handleAddTodo} />
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
