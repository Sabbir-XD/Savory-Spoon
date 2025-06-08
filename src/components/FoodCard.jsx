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
      className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out 
        ${
          isHovered
            ? "transform -translate-y-2 shadow-xl dark:shadow-gray-700/50"
            : "shadow-md dark:shadow-gray-900"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Favorite button */}
      <button
        className={`absolute top-3 left-3 z-10 p-2 rounded-full transition-all 
          ${
            isFavorite
              ? "text-red-500 dark:text-red-400 bg-white/90 dark:bg-gray-800/90"
              : "text-gray-400 dark:text-gray-500 bg-white/70 dark:bg-gray-800/70 hover:bg-white/90 dark:hover:bg-gray-800/90"
          }`}
        onClick={() => setIsFavorite(!isFavorite)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FaHeart className={isFavorite ? "fill-current" : ""} />
      </button>

      {/* Food Image with hover effect */}
      <div className="relative overflow-hidden h-56 group">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className={`w-full h-full object-cover transition-transform duration-700 ease-in-out 
            ${isHovered ? "scale-110" : "scale-100"}`}
          loading="lazy"
        />
        {/* Discount badge */}
        {food.price < food.originalPrice && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {Math.round(
              ((food.originalPrice - food.price) / food.originalPrice) * 100
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Food Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white truncate max-w-[70%]">
            {food.foodName}
          </h3>
          {getCategoryIcon()}
        </div>

        {/* Rating and reviews */}
        <div className="flex items-center mb-3">
          <div className="flex mr-2">{renderStars(food.rating || 0)}</div>
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            ({food.reviews || 0} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {food.description || "Delicious food item with premium ingredients"}
        </p>

        {/* Price and quantity */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-amber-600 dark:text-amber-400 font-bold text-xl">
              Tk{food.price}
            </span>
            {food.originalPrice && (
              <span className="text-gray-400 dark:text-gray-500 line-through text-sm ml-2">
                Tk{food.originalPrice}
              </span>
            )}
          </div>
          <div
            className={`text-sm px-2 py-1 rounded-full 
            ${
              food.quantity > 0
                ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200"
            }`}
          >
            {food.quantity > 0 ? `${food.quantity} left` : "Sold out"}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl transition-all 
              ${
                food.quantity <= 0
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white hover:from-amber-600 hover:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800 shadow-md hover:shadow-lg"
              }`}
            disabled={food.quantity <= 0}
          >
            <FaShoppingCart className="mr-2" />
            {food.quantity <= 0 ? "Unavailable" : "Add to Cart"}
          </button>

          <Link
            to={`/food/${food._id}`}
            className="flex items-center justify-center px-4 py-3 border border-amber-500 dark:border-amber-400 text-amber-600 dark:text-amber-400 rounded-xl hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FaInfoCircle className="mr-2" />
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
