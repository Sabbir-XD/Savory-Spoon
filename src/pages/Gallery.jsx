import { useState } from "react";
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import BackgroundTitle from "../components/BackgroundTitle";

const GalleryPage = () => {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Restaurant-specific food images
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Healthy breakfast bowl",
      category: "Breakfast",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Gourmet burger with fries",
      category: "Lunch",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Delicious pizza",
      category: "Dinner",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Fresh sushi platter",
      category: "Japanese",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Fresh baked goods",
      category: "Bakery",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Steak with vegetables",
      category: "Main Course",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Pasta with sauce",
      category: "Italian",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Fresh salad bowl",
      category: "Healthy",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Pancakes with fruits",
      category: "Dessert",
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Coffee and croissant",
      category: "Beverages",
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      alt: "Healthy breakfast bowl with fruits and yogurt",
      category: "Breakfast",
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      alt: "Delicious margherita pizza with fresh basil",
      category: "Italian",
    },
    {
      id: 13,
      src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
      alt: "Juicy cheeseburger with crispy fries",
      category: "American",
    },
    {
      id: 14,
      src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
      alt: "Fresh sushi platter with wasabi and ginger",
      category: "Japanese",
    },
    {
      id: 15,
      src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929",
      alt: "Assorted breakfast pastries and coffee",
      category: "Bakery",
    },
    {
      id: 16,
      src: "https://images.unsplash.com/photo-1559847844-5315695dadae",
      alt: "Grilled steak with roasted vegetables",
      category: "Main Course",
    },
    {
      id: 17,
      src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
      alt: "Creamy fettuccine alfredo pasta",
      category: "Pasta",
    },
    {
      id: 18,
      src: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71",
      alt: "Fresh kale salad with nuts and berries",
      category: "Salads",
    },
    {
      id: 19,
      src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      alt: "Fluffy pancakes with maple syrup",
      category: "Dessert",
    },
    {
      id: 20,
      src: "https://images.unsplash.com/photo-1516684732162-798a0062be99",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <BackgroundTitle />
      </div>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
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
            </div>
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
