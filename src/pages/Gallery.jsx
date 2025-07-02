import { useState, useEffect } from "react";
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import BackgroundTitle from "../components/BackgroundTitle";
import { motion } from "framer-motion";

const GalleryPage = () => {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(12);

  const galleryImages = [
    {
      id: 1,
      src: "https://i.ibb.co/mVf1mPx0/image-1.jpg",
      alt: "Healthy breakfast bowl",
      category: "Breakfast",
    },
    {
      id: 2,
      src: "https://i.ibb.co/whb8VHqH/image-2-Copy.jpg",
      alt: "Gourmet burger with fries",
      category: "Lunch",
    },
    {
      id: 3,
      src: "https://i.ibb.co/RpFwXG1c/image-3.jpg",
      alt: "Delicious pizza",
      category: "Dinner",
    },
    {
      id: 4,
      src: "https://i.ibb.co/G3sZBrqG/image-4.jpg",
      alt: "Fresh sushi platter",
      category: "Japanese",
    },
    {
      id: 5,
      src: "https://i.ibb.co/x8RCg9sr/image-5.jpg",
      alt: "Fresh baked goods",
      category: "Bakery",
    },
    {
      id: 6,
      src: "https://i.ibb.co/93HGkyJT/image-6.jpg",
      alt: "Steak with vegetables",
      category: "Main Course",
    },
    {
      id: 7,
      src: "https://i.ibb.co/jZJ6RT4K/image-7.jpg",
      alt: "Pasta with sauce",
      category: "Italian",
    },
    {
      id: 8,
      src: "https://i.ibb.co/ZpyLxgfD/image-8.jpg",
      alt: "Fresh salad bowl",
      category: "Healthy",
    },
    {
      id: 9,
      src: "https://i.ibb.co/pYvGHjR/image-9.jpg",
      alt: "Pancakes with fruits",
      category: "Dessert",
    },
    {
      id: 10,
      src: "https://i.ibb.co/hRbz7KBZ/image-10.jpg",
      alt: "Coffee and croissant",
      category: "Beverages",
    },
    {
      id: 11,
      src: "https://i.ibb.co/mVf1mPx0/image-1.jpg",
      alt: "Healthy breakfast bowl with fruits and yogurt",
      category: "Breakfast",
    },
    {
      id: 12,
      src: "https://i.ibb.co/whb8VHqH/image-2-Copy.jpg",
      alt: "Delicious margherita pizza with fresh basil",
      category: "Italian",
    },
    {
      id: 13,
      src: "https://i.ibb.co/RpFwXG1c/image-3.jpg",
      alt: "Juicy cheeseburger with crispy fries",
      category: "American",
    },
    {
      id: 14,
      src: "https://i.ibb.co/G3sZBrqG/image-4.jpg",
      alt: "Fresh sushi platter with wasabi and ginger",
      category: "Japanese",
    },
    {
      id: 15,
      src: "https://i.ibb.co/x8RCg9sr/image-5.jpg",
      alt: "Assorted breakfast pastries and coffee",
      category: "Bakery",
    },
    {
      id: 16,
      src: "https://i.ibb.co/93HGkyJT/image-6.jpg",
      alt: "Grilled steak with roasted vegetables",
      category: "Main Course",
    },
    {
      id: 17,
      src: "https://i.ibb.co/jZJ6RT4K/image-7.jpg",
      alt: "Creamy fettuccine alfredo pasta",
      category: "Pasta",
    },
    {
      id: 18,
      src: "https://i.ibb.co/ZpyLxgfD/image-8.jpg",
      alt: "Fresh kale salad with nuts and berries",
      category: "Salads",
    },
    {
      id: 19,
      src: "https://i.ibb.co/pYvGHjR/image-9.jpg",
      alt: "Fluffy pancakes with maple syrup",
      category: "Dessert",
    },
    {
      id: 20,
      src: "https://i.ibb.co/hRbz7KBZ/image-10.jpg",
      alt: "Artisan coffee with croissant",
      category: "Beverages",
    },
  ];

  const slides = galleryImages.map((image) => ({
    src: image.src,
    alt: image.alt,
  }));

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setOpen(true);
  };

  const handleScroll = () => {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (nearBottom && visibleImages < galleryImages.length) {
      setVisibleImages((prev) => Math.min(prev + 4, galleryImages.length));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleImages]);

  return (
    <div className="min-h-screen  dark:bg-gray-900 bg-white  transition-colors duration-300">
      <div>
        <BackgroundTitle />
      </div>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.slice(0, visibleImages).map((image, index) => (
            <motion.div
              key={image.id}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={() => openLightbox(index)}
                  className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 p-3 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100"
                  aria-label="Zoom in"
                >
                  <FiZoomIn className="text-gray-800 text-xl" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-white font-medium">{image.alt}</p>
                <span className="text-xs text-amber-300">{image.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={slides}
        render={{
          iconClose: () => <FiX className="text-white text-2xl" />,
          iconPrev: () => <FiChevronLeft className="text-white text-3xl" />,
          iconNext: () => <FiChevronRight className="text-white text-3xl" />,
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
          icon: { color: "white" },
        }}
        animation={{ fade: 300, swipe: 200 }}
      />
    </div>
  );
};

export default GalleryPage;
