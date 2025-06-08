import React from 'react';
import Banner from './Banner';
import DailyOffers from './DailyOffers';
import CounterSection from './CounterSection';

const Home = () => {
    return (
        <div>
            <Banner/>
            <DailyOffers/>
            <CounterSection/>
        </div>
    );
};

export default Home;