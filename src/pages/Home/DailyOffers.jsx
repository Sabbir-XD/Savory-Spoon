import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
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
      image: "https://i.ibb.co/8n866bSm/offer-1.jpg",
      description: "Fresh beef with masala spices on a bed of mixed greens",
    },
    {
      id: 2,
      discount: "10% Off",
      title: "Chicken Caesar Wrap",
      price: "180",
      image: "https://i.ibb.co/DDXk0Szm/grilled-chicken-caesar-wrap.webp",
      description: "Grilled chicken, romaine lettuce and parmesan in a soft wrap",
    },
    {
      id: 3,
      discount: "15% Off",
      title: "Vegetable Stir Fry",
      price: "120",
      image: "https://i.ibb.co/Pz3MDmvC/offer-3.jpg",
      description: "Fresh seasonal vegetables stir-fried with garlic sauce",
    },
    {
      id: 4,
      discount: "20% Off",
      title: "Margherita Pizza",
      price: "340",
      image: "https://i.ibb.co/tTBzJKQ4/offer-4.jpg",
      description: "Classic pizza with tomato sauce, mozzarella and basil",
    },
    {
      id: 5,
      discount: "5% Off",
      title: "Chocolate Brownie",
      price: "200",
      image: "https://i.ibb.co/ZRZbBNWs/offer-5.jpg",
      description: "Warm chocolate brownie with vanilla ice cream",
    },
    {
      id: 6,
      discount: "12% Off",
      title: "Avocado Toast",
      price: "120",
      image: "https://i.ibb.co/7dnHb9VG/offer-6.jpg",
      description: "Sourdough bread with mashed avocado and cherry tomatoes",
    },
    {
      id: 7,
      discount: "8% Off",
      title: "Beef Burger",
      price: "260",
      image: "https://i.ibb.co/s9MXD3p2/offer-7.jpg",
      description: "Juicy beef patty with cheese, lettuce and special sauce",
    },
    {
      id: 8,
      discount: "25% Off",
      title: "Fruit Smoothie",
      price: "110",
      image: "https://i.ibb.co/zTntx5kR/offer-8.webp",
      description: "Mixed berry smoothie with banana and yogurt",
    },
    {
      id: 9,
      discount: "18% Off",
      title: "Sushi Platter",
      price: "230",
      image: "https://i.ibb.co/RGPgNrVP/offer-9.jpg",
      description: "Assorted fresh sushi with wasabi and soy sauce",
    },
    {
      id: 10,
      discount: "7% Off",
      title: "Pasta Carbonara",
      price: "120",
      image: "https://i.ibb.co/gZHsqJ17/offer-10.jpg",
      description: "Spaghetti with creamy egg sauce, pancetta and parmesan",
    },
  ];

  return (
    <div className="relative lg:w-11/12 mx-auto px-1 bg-white dark:bg-gray-900 rounded-3xl mt-10 shadow-xl dark:shadow-lg overflow-hidden transition-all duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-200 to-orange-300 dark:from-[#7a341e] dark:to-[#78350f] px-6 md:px-10 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Left title */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FaFire className="text-amber-600 dark:text-amber-400" size={22} />
              <h2 className="text-2xl md:text-3xl font-extrabold text-orange-700 dark:text-orange-300">
                Daily Offers
              </h2>
            </div>
            <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 font-medium">
              Save up to{" "}
              <span className="text-orange-600 dark:text-orange-400 font-bold">75%</span>{" "}
              – Only for today!
            </p>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1 bg-orange-500 dark:bg-orange-600 text-white rounded-full shadow-sm text-sm font-medium">
              <FaRegClock size={16} />
              Today only
            </div>

            <div className="flex gap-2">
              <button
                ref={prevRef}
                className="p-2 rounded-full bg-orange-500 dark:bg-orange-600 text-white hover:bg-black dark:hover:bg-orange-700 hover:scale-105 transition"
                aria-label="Previous"
              >
                <FaArrowLeftLong size={16} />
              </button>
              <button
                ref={nextRef}
                className="p-2 rounded-full bg-black dark:bg-gray-800 text-white hover:bg-orange-500 dark:hover:bg-orange-700 hover:scale-105 transition"
                aria-label="Next"
              >
                <FaArrowRightLong size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Swiper Slider */}
      <div className="p-2 md:p-6 bg-gray-100 dark:bg-gray-800/40 backdrop-blur-sm transition">
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 3500,
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
