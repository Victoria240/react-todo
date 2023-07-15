import React, {useRef, useEffect} from 'react'

function InputWithLabel({ children, ...props}) {
    const inputRef = useRef(null)

    useEffect(() => {
         // Accessing the input element and focusing it
        inputRef.current.focus();
    }, []);
    

    
    return (
        <>
            <label htmlFor='todoTitle'>{children}</label>
            <input 
                ref={inputRef} 
                id='todoTitle'
                name='title'
                value={props.todoTitle} // Use todoTitle state as the value
                onChange={props.handleTitleChange} // Handle input change               
            />
        </>
    )
}

export default InputWithLabel