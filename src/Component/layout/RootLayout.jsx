import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../shared/Navbar/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Pages/Home/Footer';

const RootLayout = () => {
    return (
        <div>
            <Nav/>
            <Outlet/>
            <Footer/>
            <ToastContainer />
        </div>
    );
};

export default RootLayout;