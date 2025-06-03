import React from "react";
import logo from "../../src/assets/image/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYelp,
  FaTripadvisor,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img
                className="w-28 bg-amber-500 p-0.5 rounded-2xl mr-2"
                src={logo}
                alt="Savory Spoon Logo"
              />
              {/* <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Savory Spoon
              </span> */}
            </Link>
            <p className="text-gray-300">
              Crafting memorable dining experiences with passion and innovation
              since 2010.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-300 hover:text-amber-400 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-amber-400 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-amber-400 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-amber-400 transition-colors"
              >
                <FaYelp size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-amber-400 transition-colors"
              >
                <FaTripadvisor size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-400 border-b border-amber-600 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  Our Menu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  Reservations
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-400 border-b border-amber-600 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Gourmet Avenue
                  <br />
                  Foodie City, FC 12345
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-amber-500 mr-3" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-amber-500 mr-3" />
                <span className="text-gray-300">info@savoryspoon.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-400 border-b border-amber-600 pb-2">
              Opening Hours
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>Monday - Thursday</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Friday - Saturday</span>
                <span>11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>10:00 AM - 9:00 PM</span>
              </li>
            </ul>
            <div className="pt-2">
              <button className="px-6 py-2 bg-amber-600 hover:bg-amber-700 rounded-full font-medium text-white transition-all duration-300">
                Make Reservation
              </button>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Savory Spoon. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
