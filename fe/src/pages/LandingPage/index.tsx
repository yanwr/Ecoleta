import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import HeaderComponent from '../../components/Header';
import './style.css';

const LandingPage:React.FC = () => {
    return(
        <div id="landing-container">
            <div className="content-container">
                <HeaderComponent />
                <main>
                    <h1>Your waste collection marketplace</h1>
                    <p>We help people find collection points efficiently.</p>
                    <Link to="/create-point">
                        <span> 
                            <FiLogIn />
                        </span>
                        <strong>Create a collection point.</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
};

export default LandingPage;