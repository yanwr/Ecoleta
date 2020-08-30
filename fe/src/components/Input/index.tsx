import React, { SelectHTMLAttributes } from 'react';

interface InputComponentProps extends SelectHTMLAttributes<HTMLInputElement>  {
    name:string,
    label:string,
    type:string
}

const InputComponent:React.FC<InputComponentProps> = (props) => {
    const { label, name, type, ...defaultProps } = props;
    return(
        <div className="input-container">
            <label htmlFor={name}>{label}</label>
            <input 
                id={name}
                name={name}
                type={type}
                {...defaultProps} 
            />
        </div>
    );
};

export default InputComponent;