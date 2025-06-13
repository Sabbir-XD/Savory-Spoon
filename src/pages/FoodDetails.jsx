import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaFire,
  FaLeaf,
  FaHeart,
  FaUtensils,
  FaClock,
  FaChartLine,
  FaArrowLeft,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import axios from "axios";

const FoodDetails = () => {
  const food = useLoaderData();
  const [isFavorite, setIsFavorite] = useState(false);
  const [purchaseCount, setPurchaseCount] = useState(0);
  const navigate = useNavigate();

useEffect(() => {
   axios.get(`${import.meta.env.VITE_API_URL}/purchases`).then((response) => {
     const { data } = response;
     const filteredData = data.filter((purchase) => purchase.foodId === food._id);
     console.log(filteredData);
     setPurchaseCount(filteredData.length);
   })
})
  // Function to render star ratings
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) =>
        i < Math.floor(rating) ? (
          <FaStar key={i} className="text-amber-500 text-lg" />
        ) : (
          <FaRegStar key={i} className="text-amber-500 text-lg" />
        )
      );
  };

  // Determine food category icon and label
  const getCategoryInfo = () => {
    switch (food.foodCategory) {
      case "spicy":
        return { icon: <FaFire className="text-red-500" />, label: "Spicy" };
      case "vegetarian":
        return {
          icon: <FaLeaf className="text-green-500" />,
          label: "Vegetarian",
        };
      case "rice-menu":
        return {
          icon: <FaUtensils className="text-blue-500" />,
          label: "Rice Menu",
        };
      default:
        return { icon: null, label: food.foodCategory };
    }
  };

  const categoryInfo = getCategoryInfo();

  const handlePurchase = () => {
    setPurchaseCount(purchaseCount + 1);
    navigate(`/purchase/${food._id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        to="/AllFoods"
        className="flex items-center text-amber-600 hover:text-amber-700 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Back to Menu
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Food Image */}
        <div className="relative h-full min-h-[400px]">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Favorite button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`absolute top-4 right-4 p-3 rounded-full shadow-md transition-all 
                ${
                  isFavorite
                    ? "text-red-500 bg-white"
                    : "text-gray-400 bg-white/90 hover:bg-white"
                }`}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <FaHeart className={isFavorite ? "fill-current" : ""} size={20} />
          </button>
        </div>

        {/* Food Details */}
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {food.foodName}
            </h1>
            <div className="flex items-center bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-sm">
              {categoryInfo.icon && (
                <span className="mr-2">{categoryInfo.icon}</span>
              )}
              {categoryInfo.label}
            </div>
          </div>

          {/* Rating and reviews */}
          <div className="flex items-center mb-6">
            <div className="flex mr-2">{renderStars(4)}</div>
            <span className="text-gray-600 dark:text-gray-400">
              (Customer reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {food.description}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center">
              <FaClock className="text-gray-500 dark:text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Origin
                </p>
                <p className="font-medium">{food.foodOrigin}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaChartLine className="text-gray-500 dark:text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Category
                </p>
                <p className="font-medium">{food.foodCategory}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaUtensils className="text-gray-500 dark:text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quantity
                </p>
                <p className="font-medium">{food.quantity}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaShoppingCart className="text-gray-500 dark:text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Purchased
                </p>
                <p className="font-medium">{purchaseCount} times</p>
              </div>
            </div>
          </div>

          {/* Price and quantity */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-amber-600 dark:text-amber-400 font-bold text-2xl">
                Tk {food.price}
              </span>
            </div>
            <div
              className={`text-sm px-3 py-1 rounded-full font-medium
                ${
                  food.quantity > 0
                    ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200"
                }`}
            >
              {food.quantity > 0 ? `${food.quantity} available` : "Sold out"}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={handlePurchase}
              disabled={food.quantity <= 0}
              className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center
                  ${
                    food.quantity <= 0
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl"
                  }`}
            >
              <FaShoppingCart className="mr-3" size={18} />
              {food.quantity <= 0 ? "Currently Unavailable" : "Purchase Now"}
            </button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Vendor: {food.name} • {food.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
