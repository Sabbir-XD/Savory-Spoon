import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const Error = () => {
  return (
    <section className="flex items-center h-screen p-16 bg-amber-50 text-amber-900">
      <Helmet>
        <title>Savory Spoon | Error</title>
      </Helmet>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center relative">
          {/* Decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-amber-100 opacity-70 mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-amber-200 opacity-70 mix-blend-multiply filter blur-xl"></div>
          
          {/* Main content */}
          <div className="relative z-10">
            <div className="mb-8 transform rotate-6">
              <svg
                className="w-32 h-32 mx-auto text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            
            <h2 className="mb-6 font-extrabold text-8xl text-amber-600">
              404
            </h2>
            
            <p className="text-2xl font-semibold md:text-3xl mb-4">
              Oops! Page not found
            </p>
            
            <p className="mt-4 mb-8 text-amber-700">
              The page you're looking for has vanished like a spoonful of delicious soup.
            </p>
            
            <Link
              to="/"
              className="relative inline-flex items-center px-6 py-3 font-semibold text-amber-900 bg-amber-400 rounded-full group hover:bg-amber-500 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white opacity-10 group-hover:opacity-5 transition-opacity duration-300"></span>
              <span className="relative">
                Back to homepage
                <svg
                  className="w-4 h-4 ml-2 inline-block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;