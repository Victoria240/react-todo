import React, {useRef, useEffect} from 'react'
import style from './InputWithLabel.module.css';
import PropTypes from 'prop-types'; // Import PropTypes

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

// Define PropTypes for the specific props used by this component
InputWithLabel.propTypes = {
    children: PropTypes.node, // PropTypes for the 'children' prop
    value: PropTypes.string,  // PropTypes for the 'value' prop
    onChange: PropTypes.func, // PropTypes for the 'onChange' prop
};

export default InputWithLabel