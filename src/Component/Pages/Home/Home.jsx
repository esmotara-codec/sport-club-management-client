import React from 'react';
import Nav from '../../shared/Navbar/Nav';
import Banner from './Banner';
import AboutMissionSection from './AboutMissionSection';
import Footer from './Footer';
import LocationMap from './Location/LocationMap';

const Home = () => {
    return (
        <div>
            <Banner/>
            <AboutMissionSection/>
            <LocationMap/>
            <Footer/>
        </div>
    );
};

export default Home;