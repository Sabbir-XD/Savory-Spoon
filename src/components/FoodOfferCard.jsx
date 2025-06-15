import { FaShoppingBasket, FaHeart, FaEye } from "react-icons/fa";

const FoodOfferCard = ({ offer }) => {
  return (
    <div className="flex items-center rounded-lg shadow-lg dark:bg-gray-800  p-5 border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900 transition-shadow duration-300">
      {/* Image */} 
      <div className="relative w-32 h-32 dark:bg-gray-800 overflow-hidden rounded-lg flex-shrink-0 group">
        <img
          src={offer?.image}
          alt={offer?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-orange-500 dark:bg-orange-600 text-white text-xs font-bold rounded-full w-12 h-12 flex flex-col items-center justify-center leading-tight">
          <span>{offer?.discount.split(" ")[0]}%</span>
          <span className="text-[0.65rem]">OFF</span>
        </div>
      </div>

      {/* Content */}
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
          {offer?.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {offer?.description}
        </p>

        {/* Price and Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {offer?.originalPrice && (
              <span className="text-gray-400 dark:text-gray-400 text-sm line-through">
                TK.{offer.originalPrice}
              </span>
            )}
            <span className="text-orange-500 dark:text-orange-400 font-bold">
              TK.{offer?.price}
            </span>
          </div>

          <div className="flex space-x-2">
            <button
              className="bg-orange-500 dark:bg-orange-600 text-white p-2 rounded-full hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-200"
              aria-label="Add to basket"
            >
              <FaShoppingBasket size={16} />
            </button>
            <button
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Add to favorites"
            >
              <FaHeart size={16} />
            </button>
            <button
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Quick view"
            >
              <FaEye size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodOfferCard;