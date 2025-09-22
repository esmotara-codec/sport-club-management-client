import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../shared/Navbar/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
    return (
        <div>
            <Nav/>
            <Outlet/>
            <ToastContainer />
        </div>
    );
};

export default RootLayout;