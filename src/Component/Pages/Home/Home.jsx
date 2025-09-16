import React from 'react';
import Nav from '../../shared/Navbar/Nav';
import Banner from './Banner';
import AboutMissionSection from './AboutMissionSection';

const Home = () => {
    return (
        <div>
            <Nav/>
            <Banner/>
            <AboutMissionSection/>
        </div>
    );
};

export default Home;