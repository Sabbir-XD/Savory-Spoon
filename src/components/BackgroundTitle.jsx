import React from "react";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet";

const BackgroundTitle = () => {
  const location = useLocation();

  const path = location.pathname;
  const pageName =
    path === "/"
      ? "Home"
      : path
          .split("/")
          .filter(Boolean)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).replace(/-/g, " "))
          .join(" / ");

  // Dynamic subtitle based on page
  const getSubtitle = () => {
    if (path === "/") return "Welcome to our culinary paradise";
    if (path.includes("menu")) return "Explore our delicious offerings";
    if (path.includes("about")) return "Our story and passion for food";
    if (path.includes("contact")) return "We'd love to hear from you";
    return "Fill out the form below to add a new delicious item to our menu";
  };

  return (
    <div className="relative overflow-hidden">
      {/* Helmet for dynamic tab title */}
      <Helmet>
        <title>{pageName} | SavorySpoon</title>
        <meta name="description" content={`This is the ${pageName} page of FoodMaster.`} />
      </Helmet>

      {/* Background Image + Blend */}
      <div
        className="relative py-24 px-4 sm:px-6 lg:px-8 bg-amber-600"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-amber-900/70 mix-blend-multiply z-0"></div>

        {/* Abstract Shapes - Food themed */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-2xl z-0 rotate-12"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-amber-100/15 rounded-full blur-xl rotate-45 z-0"></div>

        {/* Mountain/Brush-style Bottom Clip */}
        <div className="absolute bottom-0 left-0 w-full h-20 z-10 overflow-hidden">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="absolute bottom-0 left-0 w-full h-full"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
              className="fill-current text-white"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
              className="fill-current text-white"
            ></path>
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-current text-white"
            ></path>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
            {pageName}
          </h1>
          <p className="mt-4 text-xl text-amber-100 max-w-3xl mx-auto drop-shadow-md">
            {getSubtitle()}
          </p>
          
          {/* Decorative food icons */}
          <div className="mt-6 flex justify-center space-x-6 opacity-80">
            <svg className="h-8 w-8 text-amber-200" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg className="h-8 w-8 text-amber-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <svg className="h-8 w-8 text-amber-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundTitle;