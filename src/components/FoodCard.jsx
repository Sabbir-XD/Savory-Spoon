import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaInfoCircle,
  FaFire,
  FaLeaf,
  FaHeart,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";

const FoodCard = ({ food }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to render star ratings
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) =>
        i < Math.floor(rating) ? (
          <FaStar key={i} className="text-amber-500 dark:text-amber-400" />
        ) : (
          <FaRegStar key={i} className="text-amber-500 dark:text-amber-400" />
        )
      );
  };

  // Determine food category icon
  const getCategoryIcon = () => {
    if (food.category === "spicy")
      return <FaFire className="text-red-500 dark:text-red-400" />;
    if (food.category === "vegetarian")
      return <FaLeaf className="text-green-500 dark:text-green-400" />;
    return null;
  };

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out
    ${
      isHovered
        ? "transform -translate-y-1.5 shadow-lg dark:shadow-gray-700/40"
        : "shadow-sm dark:shadow-gray-900/30"
    }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Favorite Button */}
      <button
        className={`absolute top-2 left-2 z-10 p-1.5 rounded-full text-sm transition 
      ${
        isFavorite
          ? "text-red-500 bg-white dark:bg-gray-800"
          : "text-gray-400 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-800"
      }`}
        onClick={() => setIsFavorite(!isFavorite)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FaHeart className={isFavorite ? "fill-current" : ""} />
      </button>

      {/* Image */}
      <div className="relative overflow-hidden h-40 group">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          loading="lazy"
        />
        {food.price < food.originalPrice && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">
            {Math.round(
              ((food.originalPrice - food.price) / food.originalPrice) * 100
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white truncate max-w-[70%]">
            {food.foodName}
          </h3>
          {getCategoryIcon()}
        </div>

        <div className="flex items-center mb-2">
          <div className="flex mr-1">{renderStars(food.rating || 0)}</div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({food.reviews || 0})
          </span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-amber-600 dark:text-amber-400 font-bold text-lg">
              Tk{food.price}
            </span>
            {food.originalPrice && (
              <span className="text-xs line-through ml-1 text-gray-400 dark:text-gray-500">
                Tk{food.originalPrice}
              </span>
            )}
          </div>
          <div
            className={`text-xs px-2 py-0.5 rounded-full 
        ${
          food.quantity > 0
            ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-200"
            : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200"
        }`}
          >
            {food.quantity > 0 ? `${food.quantity} left` : "Sold out"}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            className={`flex-1 flex items-center justify-center px-3 py-1.5 rounded-lg text-sm transition 
          ${
            food.quantity <= 0
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
          }`}
            disabled={food.quantity <= 0}
          >
            <FaShoppingCart className="mr-1" />
            {food.quantity <= 0 ? "Unavailable" : "Add"}
          </button>

          <Link
            to={`/food/${food._id}`}
            className="flex items-center justify-center px-3 py-1.5 border border-amber-500 dark:border-amber-400 text-sm rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700"
          >
            <FaInfoCircle className="mr-1" />
            Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
