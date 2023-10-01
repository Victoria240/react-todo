// TodoList.js
import React from "react";
import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css"; // Import the CSS module
import PropTypes from "prop-types"; // Import PropTypes


// Destructure the props todoList and onRemoveTodo from the incoming props object
function TodoList({ todoList, onRemoveTodo }) {
  return (
    <div className={styles.TodoListContainer}>
      <div className={styles.TodoList}>
        {/* Render a heading */}
        <h2 className={styles.ListHeader}>Todo List</h2>
        <ul className={styles.List}>
          {/* Map over the todoList array */}
          {todoList.map((todo) => (
            <TodoListItem
              key={todo.id} // Assign a unique key to each TodoListItem
              todo={todo} // Pass the todo object as a prop to TodoListItem
              onRemoveTodo={onRemoveTodo} // Pass the onRemoveTodo function as a prop to TodoListItem
            />
          ))}
        </ul>
      </div>
      x
    </div>
  );
}
TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,// PropTypes for the 'todoList' prop
  onRemoveTodo: PropTypes.func, // PropTypes for the 'onRemoveTodo' prop
};

export default TodoList;
