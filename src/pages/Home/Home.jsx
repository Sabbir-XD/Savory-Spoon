import React from 'react';
import Banner from './Banner';
import DailyOffers from './DailyOffers';
import CounterSection from './CounterSection';
import InteractiveChefsTable from '../../components/InteractiveChefsTable';
import Newsletter from './Newsletter';

const Home = () => {
    return (
        <div>
            <Banner/>
            <DailyOffers/>
            <CounterSection/>
            <InteractiveChefsTable/>
            <Newsletter/>
        </div>
    );
};

export default Home;