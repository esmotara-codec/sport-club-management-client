import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../shared/Navbar/Nav';

const RootLayout = () => {
    return (
        <div>
            <Nav/>
            <Outlet/>
        </div>
    );
};

export default RootLayout;