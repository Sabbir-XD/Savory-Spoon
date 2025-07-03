import { FaShoppingBasket, FaHeart, FaEye } from "react-icons/fa";

const FoodOfferCard = ({ offer }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl dark:hover:shadow-gray-900 transition duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">
      {/* Image */}
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={offer?.image}
          alt={offer?.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white text-[0.6rem] font-bold rounded-full w-10 h-10 flex flex-col items-center justify-center shadow-md">
          <span className="text-sm">{offer?.discount?.split(" ")[0]}</span>
          <span className="text-[0.6rem]">OFF</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1 truncate">
          {offer?.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {offer?.description}
        </p>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          {/* Price Section */}
          <div className="flex items-center gap-1">
            {offer?.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                Tk.{offer.originalPrice}
              </span>
            )}
            <span className="text-orange-600 dark:text-orange-400 font-bold text-base">
              Tk.{offer?.price}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              className="p-[6px] bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-full transition duration-200"
              title="Add to basket"
            >
              <FaShoppingBasket size={14} />
            </button>
            <button
              className="p-[6px] bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition duration-200"
              title="Add to favorites"
            >
              <FaHeart size={14} />
            </button>
            <button
              className="p-[6px] bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition duration-200"
              title="Quick view"
            >
              <FaEye size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodOfferCard;
