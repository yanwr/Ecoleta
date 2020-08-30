import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LadingPage from './pages/LandingPage';
import RegisterPointPage from './pages/CreatePointPage';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route exact path={'/'} component={LadingPage} />
            <Route exact path={'/create-point'} component={RegisterPointPage} />
        </BrowserRouter>
    );
}

export default Routes;