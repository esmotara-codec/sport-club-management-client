import React from 'react';
import Nav from '../../shared/Navbar/Nav';
import Banner from './Banner';
import AboutMissionSection from './AboutMissionSection';
import LocationMap from './Location/LocationMap';
import PromotionsSection from './PromotionalSection/PromotionsSection';

const Home = () => {
    return (
        <div>
            <Banner/>
            <AboutMissionSection/>
            <PromotionsSection/>
            <LocationMap/>
            
        </div>
    );
};

export default Home;