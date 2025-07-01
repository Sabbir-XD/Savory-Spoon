import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import FoodCard from "../../components/FoodCard";

const TopSellingFood = () => {
  const [topFoods, setTopFoods] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/top-foods`)
      .then((res) => setTopFoods(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-11/12 mx-auto mt-10 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">
          🍽️ Top <span className="text-orange-400">Selling Foods</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Discover our top-selling foods, carefully curated to satisfy your
          cravings and satisfy your cravings.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {topFoods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>

      {/* See All Button */}
      <div className="flex justify-center mt-8">
        <Link
          to="/AllFoods"
          className="inline-block px-6 py-2 rounded bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white hover:from-amber-600 hover:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800 shadow-md hover:shadow-lg"
        >
          See All Foods
        </Link>
      </div>
    </div>
  );
};

export default TopSellingFood;
