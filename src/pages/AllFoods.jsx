import React, { useState } from "react";
import BackgroundTitle from "../components/BackgroundTitle";
import { useLoaderData } from "react-router";
import FoodCard from "../components/FoodCard";
import FoodSearch from "../components/FoodSearch";

const AllFoods = () => {
  const initialData = useLoaderData();
  const [filteredData, setFilteredData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredData(initialData);
      return;
    }
    const filtered = initialData.filter((food) =>
      food.foodName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <BackgroundTitle />
      <FoodSearch onSearch={handleSearch} />
      <div id="AllFoods" className="lg:w-11/12 mx-auto px-2 mt-10 grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredData.length > 0 ? (
          filteredData.map((food) => <FoodCard key={food._id} food={food} />)
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-600 text-lg">
              {searchTerm
                ? `No foods found matching "${searchTerm}"`
                : "No foods available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
