import { FaShoppingBasket, FaHeart, FaEye } from "react-icons/fa";

const FoodOfferCard = ({ offer }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl dark:hover:shadow-gray-900 transition duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Image */}
      <div className="relative w-full h-40 overflow-hidden group">
        <img
          src={offer?.image}
          alt={offer?.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-orange-500 dark:bg-orange-600 text-white text-[0.6rem] font-bold rounded-full w-10 h-10 flex flex-col items-center justify-center shadow">
          <span className="text-sm">{offer?.discount.split(" ")[0]}</span>
          <span className="text-[0.6rem]">OFF</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
          {offer?.title}
        </h3>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center space-x-2">
            {offer?.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                Tk.{offer.originalPrice}
              </span>
            )}
            <span className="text-orange-500 dark:text-orange-400 font-bold">
              Tk.{offer?.price}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <button
              className="p-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-full transition duration-200"
              title="Add to basket"
            >
              <FaShoppingBasket size={14} />
            </button>
            <button
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition duration-200"
              title="Add to favorites"
            >
              <FaHeart size={14} />
            </button>
            <button
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition duration-200"
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
