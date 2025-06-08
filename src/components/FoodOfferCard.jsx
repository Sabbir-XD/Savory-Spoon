import { FaShoppingBasket, FaHeart, FaEye } from "react-icons/fa";

const FoodOfferCard = ({ offer }) => {

  return (
    <div className="flex items-center bg-white rounded-lg shadow p-5 border border-gray-200">
      {/* Image */}
      <div className="relative w-32 h-32 overflow-hidden rounded-lg flex-shrink-0">
        <img
          src={offer?.image}
          alt={offer?.title}
          className="w-full h-full object-cover"
        />
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold rounded-full w-12 h-12 flex items-center justify-center leading-tight text-center p-2">
          {offer?.discount.split(" ")[0]}%
          <br />
          Off
        </div>
      </div>

      {/* Content */}
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{offer?.title}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{offer?.description}</p>

        {/* Action Icons */}
        <div className="flex space-x-2">
          <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition">
            <FaShoppingBasket size={16} />
          </button>
          <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition">
            <FaHeart size={16} />
          </button>
          <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition">
            <FaEye size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodOfferCard;
