import React from "react";
import Banner from "./Banner";
import DailyOffers from "./DailyOffers";
import CounterSection from "./CounterSection";
import Newsletter from "./Newsletter";
import TopSellingFood from "./TopSellingFood";
import BlogSection from "./BlogSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <DailyOffers />
      <TopSellingFood />
      <CounterSection />
      <BlogSection />
      <Newsletter />
    </div>
  );
};

export default Home;
