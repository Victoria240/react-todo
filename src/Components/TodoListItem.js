import React, { useState } from 'react';
import style from './TodoListItem.module.css'; // Import the CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'; // Import PropTypes


// Define the TodoListItem component
function TodoListItem({ todo, onRemoveTodo }) {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const listItemStyle = {
        textDecoration: isChecked ? 'line-through' : 'none',
    };

    // Define a click event handler for the remove button
    const handleRemoveClick = () => {
        // Call the onRemoveTodo callback with the todo id as the argument
        onRemoveTodo(todo.id);
    };

    return (
        <div>
            <li className={style.ListItem}>
                <label>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                </label>
                <span style={listItemStyle}>{todo.title}</span>

                <button onClick={handleRemoveClick} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                    Remove
                </button>
            </li> {/* Render the todo item title */}
        </div>
    );
}

TodoListItem.propTypes = {

    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        createdTime: PropTypes.instanceOf(Date).isRequired,
    }),
    onRemoveTodo: PropTypes.func, // PropTypes for the 'onChange' prop
};

export default TodoListItem;
