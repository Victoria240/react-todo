// import React from 'react'

// export default function TodoList() {
//   return (
//       <div>
//           <ul>
//               {/* Map over the todoList array and render a list item for each todo */}
//               {todoList.map(todo => (
//                   <li key={todo.id}>{todo.title}</li>  /* Use the id as the key and display the title */
//               ))}
//           </ul>
//     </div>
//   )
// }

import React from 'react'
import TodoListItem from './TodoListItem';



// Define the TodoList component
function TodoList(props) {
    // Define an array of todo items
    const todoList = [
        { id: 1, title: 'Complete assignment' },  // First todo item
        { id: 2, title: 'Buy groceries' },        // Second todo item
        { id: 3, title: 'Go for a run' },         // Third todo item
    ];
    return (
        <ul>
            {/* Map over the todoList array and render a list item for each todo */}
            {todoList.map(todo => (
                <TodoListItem key={todo.id} todo={todo} /> // Render a TodoListItem component for each todo item
            ))}
        </ul>
    );
}

export default TodoList;
