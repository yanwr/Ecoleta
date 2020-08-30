import React, { SelectHTMLAttributes } from 'react';
import { IBGE_FORMATED } from '../../shared/models';

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement>  {
    datas:IBGE_FORMATED[],
    name:string,
    label:string,
    defaultLabelOpition:string,
}

const SelectInputComponent:React.FC<SelectInputProps> = (props) => {
    const { datas, label, name, defaultLabelOpition, ...defaultProps } = props;

    function renderOptions() {
       return datas.map(element => (
            <option 
                key={element.id}
                value={element.value}
            >{element.value}</option>
       ));
    };

    return(
        <div className="input-container">
            <label htmlFor={name}>{label}</label>
            <select 
                id={name}
                name={name}
                {...defaultProps}
            >
                <option value={0}>{defaultLabelOpition}</option>
                { renderOptions() }
            </select>
        </div>
    );
};

export default SelectInputComponent;