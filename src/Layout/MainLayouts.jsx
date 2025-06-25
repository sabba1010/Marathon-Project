import React from 'react';
import Nav from '../Component/Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer';


const MainLayouts = () => {
    return (
        <div>
            <Nav/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayouts;