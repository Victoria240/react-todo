// TodoList.js
import React from 'react';
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css'; // Import the CSS module
import PropTypes from 'prop-types'; // Import PropTypes

function TodoList({ todoList, onRemoveTodo }) {
    // Destructure the props todoList and onRemoveTodo from the incoming props object

    return (
        <div className={styles.TodoListContainer}>
            <div className={styles.TodoList}>
                {/* Render a heading */}
                <h2 className={styles.ListHeader}>Todo List</h2>
                <ul className={styles.List}>
                    {/* Map over the todoList array */}
                    {todoList.map(todo => (

                        <TodoListItem
                            key={todo.id} // Assign a unique key to each TodoListItem
                            todo={todo} // Pass the todo object as a prop to TodoListItem
                            onRemoveTodo={onRemoveTodo} // Pass the onRemoveTodo function as a prop to TodoListItem
                        />

                    ))}
                </ul>
            </div>
        </div>
    );
}
TodoList.propTypes = {

    todoList: PropTypes.func, // PropTypes for the 'todoList' prop
    onRemoveTodo: PropTypes.func, // PropTypes for the 'onChange' prop
};

export default TodoList;

