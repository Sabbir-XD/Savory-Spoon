import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaFire, FaRegClock } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import FoodOfferCard from "../../components/FoodOfferCard";

const DailyOffer = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const offers = [
    {
      id: 1,
      discount: "13% Off",
      title: "Beef Masala Salad",
      price: "220",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      description: "Fresh beef with masala spices on a bed of mixed greens",
    },
    {
      id: 2,
      discount: "10% Off",
      title: "Chicken Caesar Wrap",
      price: "180",
      image:
        "https://i.ibb.co/DDXk0Szm/grilled-chicken-caesar-wrap.webp",
      description:
        "Grilled chicken, romaine lettuce and parmesan in a soft wrap",
    },
    {
      id: 3,
      discount: "15% Off",
      title: "Vegetable Stir Fry",
      price: "120",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
      description: "Fresh seasonal vegetables stir-fried with garlic sauce",
    },
    {
      id: 4,
      discount: "20% Off",
      title: "Margherita Pizza",
      price: "340",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      description: "Classic pizza with tomato sauce, mozzarella and basil",
    },
    {
      id: 5,
      discount: "5% Off",
      title: "Chocolate Brownie",
      price: "200",
      image:
        "https://img.freepik.com/free-photo/chocolate-brownies-sackcloth-coffee-beans-wooden-table_1150-20910.jpg?semt=ais_hybrid&w=740",
      description: "Warm chocolate brownie with vanilla ice cream",
    },
    {
      id: 6,
      discount: "12% Off",
      title: "Avocado Toast",
      price: "120",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnmqONlrqyavI-eBSRE8O-jdxXxqE3wRmMdQ&s",
      description: "Sourdough bread with mashed avocado and cherry tomatoes",
    },
    {
      id: 7,
      discount: "8% Off",
      title: "Beef Burger",
      price: "260",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      description: "Juicy beef patty with cheese, lettuce and special sauce",
    },
    {
      id: 8,
      discount: "25% Off",
      title: "Fruit Smoothie",
      price: "110",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71",
      description: "Mixed berry smoothie with banana and yogurt",
    },
    {
      id: 9,
      discount: "18% Off",
      title: "Sushi Platter",
      price: "230",
      image:
        "https://img.freepik.com/premium-photo/assorted-sushi-platter-elegant-table-setting_711700-21906.jpg",
      description: "Assorted fresh sushi with wasabi and soy sauce",
    },
    {
      id: 10,
      discount: "7% Off",
      title: "Pasta Carbonara",
      price: "120",
      image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb",
      description: "Spaghetti with creamy egg sauce, pancetta and parmesan",
    },
  ];

  return (
    <div className="relative max-w-full mx-auto bg-white dark:bg-gray-800 rounded-xl mt-10 mb-10 shadow-lg dark:shadow-black/40 overflow-hidden transition-all duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-200 to-orange-300 dark:from-[#7a341e] dark:to-[#78350f] p-6 md:p-8 transition-all duration-500">
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <div>
            <div className="flex items-center space-x-2">
              <FaFire className="text-amber-500 dark:text-amber-400" size={28} />
              <h2 className="text-2xl text-orange-600 dark:text-orange-300 font-bold">
                Daily Offer
              </h2>
            </div>
            <p className="mt-4 text-gray-800 dark:text-gray-100 text-2xl md:text-3xl font-bold">
              Up to{" "}
              <span className="text-orange-600 dark:text-orange-400">75% off</span> for this day
            </p>
          </div>

          <div className="flex flex-col items-end space-y-4">
            <div className="flex items-center space-x-1 bg-orange-500 dark:bg-orange-600 px-4 py-1 rounded-full text-white shadow-md">
              <FaRegClock size={16} />
              <span className="text-sm font-medium">Today only</span>
            </div>

            {/* Navigation Arrows */}
            <div className="flex space-x-2">
              <button
                ref={prevRef}
                className="bg-orange-500 dark:bg-orange-600 p-2 rounded-full shadow-md cursor-pointer hover:bg-black dark:hover:bg-orange-800 hover:scale-110 transition duration-300"
                aria-label="Previous offer"
              >
                <FaArrowLeftLong className="text-white" size={16} />
              </button>
              <button
                ref={nextRef}
                className="bg-black dark:bg-gray-900 p-2 rounded-full shadow-md cursor-pointer hover:bg-orange-500 dark:hover:bg-orange-700 hover:scale-110 transition duration-300"
                aria-label="Next offer"
              >
                <FaArrowRightLong className="text-white" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Slider */}
      <div className="p-4 relative bg-gray-100 dark:bg-gray-900/30 backdrop-blur-sm transition-all duration-500">
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Navigation, Autoplay]}
          loop={true}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <div className="pb-6">
                <FoodOfferCard offer={offer} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DailyOffer;
