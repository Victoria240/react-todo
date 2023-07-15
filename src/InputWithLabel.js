import React, {useRef, useEffect} from 'react'

function InputWithLabel({ children, value, onChange}) {
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
                value={value} // Use todoTitle state as the value
                onChange={onChange} // Handle input change               
            />
        </>
    )
}

export default InputWithLabel