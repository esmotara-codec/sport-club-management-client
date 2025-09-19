import React from 'react';
import Nav from '../../shared/Navbar/Nav';
import Banner from './Banner';
import AboutMissionSection from './AboutMissionSection';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <Banner/>
            <AboutMissionSection/>
            <Footer/>
        </div>
    );
};

export default Home;