import React from 'react'

// function TodoListItem() {
//   return (
//       <div>
//           <li key={todo.id}>{todo.title}</li>  {/* Use the id as the key and display the title */}
//       </div>
//   )
// }

// export default TodoListItem



// Define the TodoListItem component
function TodoListItem(props) {
    return (
        <li> {props.todo.title}</li> // Render the todo item title with the unique id as the key
    );
}

export default TodoListItem;