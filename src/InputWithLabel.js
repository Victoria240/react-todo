import React, {useRef, useEffect} from 'react'
import style from './InputWithLabel.module.css';

function InputWithLabel({ children, value, onChange}) {
    const inputRef = useRef(null)

    useEffect(() => {
         // Accessing the input element and focusing it
        inputRef.current.focus();
    }); //remove dependency array so that the effect is triggered on every render
    

    
    return (
        <div className={style.InputWithLabel}>
            <label htmlFor='todoTitle'>{children}</label>
            <input 
                ref={inputRef} 
                id='todoTitle'
                name='title'
                value={value} // Use todoTitle state as the value
                onChange={onChange} // Handle input change  
                placeholder = "Add Todo"
            />
        </div>
    )
}

export default InputWithLabel