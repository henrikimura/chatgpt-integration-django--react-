import React from 'react'   ;
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

import Home from '../pages/Home';
import Domain from '../pages/Domain';

const RoutesTree = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/domain/:domainParam" element={<Domain />} />
            </Routes>
        </Router>
    )
}
export default RoutesTree;