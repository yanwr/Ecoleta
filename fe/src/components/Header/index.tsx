import React from 'react';
import Logo from '../../assets/logo.svg';
import './style.css';

interface HeaderComponentProps {
    title?: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = (props) => {
    const { title, children } = props;
    return(
        <header className={"header-container"}>
            <img  src={Logo} alt={"eCOLETA"} />
            {children}
        </header>
    );
};

export default HeaderComponent;