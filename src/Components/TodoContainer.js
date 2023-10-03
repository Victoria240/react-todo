import React, { useEffect, useState, useCallback } from "react";
import TodoList from "./TodoList";
import styles from "./TodoContainer.module.css";

function TodoContainer() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAscending, setIsAscending] = useState(true); // Track sorting order

    // Memoize the fetchData function using useCallback to ensure a stable reference
    const fetchData = useCallback(async () => {
        // Define options for the API request
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        };

        // Construct the URL for the API with ascending or descending order
        // Update the URL with sort parameters (field and direction)
        const order = isAscending ? "asc" : "desc";
        const sortField = "created"; // Change this to the desired sorting field
        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?sort[0][field]=${sortField}&sort[0][direction]=${order}`;

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                console.log("Airtable error response:");
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            }

            // Parse the response JSON
            const data = await response.json();
            console.log('API Response Data:', data);

            // Transform API data.records into todo objects
            const todos = data.records.map((record) => ({
                id: record.id,
                title: record.fields.title,
                createdTime: new Date(record.fields.createdTime),
            }));

            // Update todoList and isLoading states
            setTodoList(todos);
            setIsLoading(false);
        } catch (error) {
            console.log(`Fetch error: ${error.message}`);
        }
    }, [isAscending]);

    // Fetch data on initial render and whenever sorting order changes
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line 
    }, [fetchData]);

    // Function to toggle sorting order and sort the todoList accordingly
    function toggleSortingOrder() {
        // Toggle between ascending and descending order
        setIsAscending(!isAscending);

        // Sort the todoList based on the new sorting order
        setTodoList((prevTodoList) =>
            [...prevTodoList].sort((a, b) => {
                return isAscending ? a.createdTime < b.createdTime ? -1 : 1 : a.createdTime > b.createdTime ? -1 : 1;
            })
        );
    }



    // Define the removeTodo function to remove a todo item
    function removeTodo(id) {
        // Filter the todoList array to exclude the todo item with the specified id
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);

        // Update the todoList state with the new array of todos
        setTodoList(updatedTodoList);
    }

    return (
        <>
            <button
                onClick={toggleSortingOrder}
                className={styles.ToggleButton}
            >
                Toggle Sorting Order: {isAscending ? "Ascending" : "Descending"}
            </button>
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} isLoading={isLoading} />
        </>
    );
}

export default TodoContainer;
