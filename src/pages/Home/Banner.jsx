import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  FaStar,
  FaUtensils,
  FaFire,
  FaLeaf,
  FaRegBuilding,
  FaWater,
  FaArrowRight,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";

const Banner = () => {
  const banners = [
    {
      id: 1,
      title: "Elegant Dining Experience",
      description: "Enjoy our sophisticated ambiance with panoramic city views",
      image: "https://i.ibb.co/dsHTSnrt/restaurant-interior.jpg",
      tag: "Ambiance",
      icon: <FaRegBuilding className="text-amber-500" />,
      accentColor: "from-green-500/20 to-green-800/10",
    },
    {
      id: 2,
      title: "Premium Steak Selection",
      description: "Juicy 200g Angus beef with our signature spice rub",
      image:
        "https://i.ibb.co/q3FnGg8y/top-view-table-full-delicious-food-composition.jpg",
      tag: "Chef's Special",
      icon: <FaFire className="text-red-500" />,
      accentColor: "from-red-500/20 to-red-800/10",
    },
    {
      id: 3,
      title: "Traditional Food Platter",
      description: "Authentic flavors passed down through generations",
      image: "https://i.ibb.co/3y1tXPYr/delicious-indian-food-tray.jpg",
      tag: "Popular",
      icon: <FaUtensils className="text-blue-500" />,
      accentColor: "from-blue-500/20 to-blue-800/10",
    },
    {
      id: 4,
      title: "Quick Food Survey",
      description: "Tell us what you think about the food and service!",
      image:
        "https://i.ibb.co/ynbnTx1D/happy-waiter-serving-food-group-cheerful-friends-pub.jpg",
      tag: "Ocean Fresh",
      icon: <FaWater className="text-blue-300" />,
      accentColor: "from-cyan-500/20 to-cyan-800/10",
    },
    {
      id: 5,
      title: "Artisan Desserts",
      description: "Handcrafted sweets with seasonal ingredients",
      image: "https://i.ibb.co/CKD2TfK2/Artisan-Desserts.jpg",
      tag: "Sweet Ending",
      icon: <FaStar className="text-yellow-500" />,
      accentColor: "from-yellow-500/20 to-yellow-800/10",
    },
  ];

  return (
    <div className="relative w-full mx-auto rounded-2xl overflow-hidden shadow-2xl group">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "tailwind-bullet",
          bulletActiveClass: "tailwind-bullet-active",
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[60vh] sm:h-[70vh] lg:h-[80vh]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] min-h-[400px] lg:min-h-[600px] w-full">
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${banner.accentColor} via-black/60 to-black/70`}
              ></div>

              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${banner.image})` }}
              ></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-start px-4 sm:px-8 lg:px-24">
                <div className="flex items-center mb-3 sm:mb-4 bg-black/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-white/20">
                  {banner.icon}
                  <span className="ml-2 text-xs sm:text-sm font-medium text-white">
                    {banner.tag}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 text-white leading-tight max-w-2xl">
                  {banner.title}
                </h2>

                <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 max-w-xl">
                  {banner.description}
                </p>

                <div className="flex gap-3 sm:gap-4">
                  <Link to="/AllFoods" className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-amber-600 hover:bg-amber-700 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg">
                    View All Foods <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="custom-pagination absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 transform z-10 flex gap-2"></div>

      {/* Custom Navigation */}
      <button className="hidden sm:flex custom-prev absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button className="hidden sm:flex custom-next absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Banner;
