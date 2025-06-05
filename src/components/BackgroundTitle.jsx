import React from "react";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";

const BackgroundTitle = () => {
  const location = useLocation();

  const path = location.pathname;
  const pageName =
    path === "/"
      ? "Home"
      : path
          .split("/")
          .filter(Boolean)
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).replace(/-/g, " ")
          )
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
        <meta
          name="description"
          content={`This is the ${pageName} page of FoodMaster.`}
        />
      </Helmet>

      {/* Background Image + Blend */}
      <div
        className="relative py-12 px-4 sm:px-6 lg:px-8 bg-amber-600"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-amber-900/70 mix-blend-multiply z-0"></div>
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
            {pageName}
          </h1>
          <p className="mt-4 text-xl text-amber-100 max-w-3xl mx-auto drop-shadow-md">
            {getSubtitle()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackgroundTitle;
