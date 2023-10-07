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
                createdTime: new Date(record.createdTime),
            }));

            // Update todoList and isLoading states
            setTodoList(todos);
            setIsLoading(false);
        } catch (error) {
            console.log(`Fetch error: ${error.message}`);
        }
    }, [isAscending]);

    // Fetch data on initial render
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line 
    }, []);

    // Function to toggle sorting order and sort the todoList accordingly
    function toggleSortingOrder() {
        // Toggle between ascending and descending order
        setIsAscending(!isAscending);

        // Sort the todoList based on the new sorting order
        setTodoList((prevTodoList) =>
            [...prevTodoList].sort((a, b) => {
                if (isAscending) {
                    return a.createdTime < b.createdTime ? -1 : 1;
                } else {
                    return a.createdTime > b.createdTime ? -1 : 1;
                }
            })
        )
    }


    function removeTodo(id) {
        // Construct the URL for the DELETE request
        const deleteUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;

        // Define options for the DELETE request
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        };

        // Send the DELETE request
        fetch(deleteUrl, options)
            .then((response) => {
                if (response.status === 204) {
                    // Deletion was successful, proceed to update the todoList state
                    // Filter the todoList to exclude the record with the specified id
                    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
                    console.log("Updated Todo List:", updatedTodoList); // Checking if it's correct
                    // Update the todoList state with the new filtered array
                    setTodoList(updatedTodoList);
                } else {
                    // Handle errors or non-successful responses here
                    console.error("Failed to delete record:", response.status);
                }
            })
            .catch((error) => {
                console.error("Delete request error:", error);
            });
    }


    return (
        <>
            <button
                onClick={toggleSortingOrder}
                className={styles.ToggleButton}
            >
                Toggle Sorting Order: {isAscending ? "Descending" : "Ascending"}
            </button>
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} isLoading={isLoading} />
        </>
    );
}

export default TodoContainer;
