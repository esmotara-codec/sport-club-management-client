import React from 'react';
import Nav from '../../shared/Navbar/Nav';
import Banner from './Banner';
import AboutMissionSection from './AboutMissionSection';
import Footer from './Footer';
import LocationMap from './Location/LocationMap';
import PromotionsSection from './PromotionalSection/PromotionsSection';

const Home = () => {
    return (
        <div>
            <Banner/>
            <AboutMissionSection/>
            <PromotionsSection/>
            <LocationMap/>
            <Footer/>
        </div>
    );
};

export default Home;